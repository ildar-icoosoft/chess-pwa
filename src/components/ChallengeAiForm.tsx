import { Formik, FormikHelpers } from "formik";
import React, { FC, FormEvent } from "react";
import { ChallengeAiData } from "../interfaces/ChallengeAiData";
import { Alert, Button, Form } from "react-bootstrap";

export interface ChallengeAiFormProps {
  onSubmit(
    values: ChallengeAiData,
    formikHelpers: FormikHelpers<ChallengeAiData>
  ): void | Promise<void>;
}

export const ChallengeAiForm: FC<ChallengeAiFormProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ level: 1, color: "", clockLimit: 5, clockIncrement: 3 }}
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
        /* and other goodies */
      }) => (
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          onChange={() => setStatus("")}
        >
          {!!status && <Alert variant="danger">{status}</Alert>}
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

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};
