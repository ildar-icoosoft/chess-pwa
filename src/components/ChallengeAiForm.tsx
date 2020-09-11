import { Formik, FormikHelpers } from "formik";
import React, { FC, FormEvent } from "react";
import { ChallengeAiData } from "../interfaces/ChallengeAiData";
import { Alert, Button, ButtonGroup, Form, Row } from "react-bootstrap";
import css from "./ChallengeAiForm.module.scss";
import cx from "classnames";

export interface ChallengeAiFormProps {
  onSubmit(
    values: ChallengeAiData,
    formikHelpers: FormikHelpers<ChallengeAiData>
  ): void | Promise<void>;
}

export const ChallengeAiForm: FC<ChallengeAiFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ level: 3, color: "", clockLimit: 5, clockIncrement: 3 }}
      onSubmit={(values, formikHelpers): Promise<void> | void => {
        if (onSubmit) {
          return onSubmit(values as ChallengeAiData, formikHelpers as any);
        }
        return undefined;
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        status,
        setStatus,
        setFieldValue,
        /* and other goodies */
      }) => (
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          onChange={() => setStatus("")}
        >
          {!!status && <Alert variant="danger">{status}</Alert>}
          <fieldset>
            <Form.Group>
              <Form.Label>Minutes per side: {values.clockLimit}</Form.Label>
              <Form.Control
                type="range"
                name="clockLimit"
                onBlur={handleBlur}
                value={values.clockLimit}
                onChange={handleChange}
                min="1"
                max="30"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Increment in seconds: {values.clockIncrement}
              </Form.Label>
              <Form.Control
                type="range"
                name="clockIncrement"
                onBlur={handleBlur}
                value={values.clockIncrement}
                onChange={handleChange}
                min="0"
                max="60"
              />
            </Form.Group>
          </fieldset>

          <div className="text-center">Level</div>

          <Row>
            <ButtonGroup className={cx("mx-auto", css.levelButtonGroup)}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((level) => (
                <Button
                  type="button"
                  variant={level === values.level ? "dark" : "light"}
                  onClick={() => setFieldValue("level", level)}
                >
                  {level}
                </Button>
              ))}
            </ButtonGroup>
          </Row>

          <div className="text-center">A.I. Level: {values.level}</div>

          <div className={css.colorSubmits}>
            <button
              type="submit"
              title="Black"
              className={cx(css.colorSubmitsButton, css.blackButton)}
              name="color"
              value="black"
            >
              <i></i>
            </button>
            <button
              type="submit"
              title="Random side"
              className={cx(css.colorSubmitsButton, css.randomButton)}
              name="color"
              value="random"
            >
              <i></i>
            </button>
            <button
              type="submit"
              title="White"
              className={cx(css.colorSubmitsButton, css.whiteButton)}
              name="color"
              value="white"
            >
              <i></i>
            </button>
          </div>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
