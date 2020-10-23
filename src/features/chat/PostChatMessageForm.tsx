/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { FC, FormEvent } from "react";
import { Formik, FormikHelpers } from "formik";
import { Button, Form } from "react-bootstrap";
import cx from "classnames";
import css from "./PostChatMessageForm.module.scss";

export interface PostChatMessageFormData {
  text: string;
}

export interface PostChatMessageFormProps {
  onSubmit?(
    values: PostChatMessageFormData,
    formikHelpers: FormikHelpers<PostChatMessageFormData>
  ): void | Promise<any>;
}

export const PostChatMessageForm: FC<PostChatMessageFormProps> = ({
  onSubmit,
}) => {
  return (
    <Formik
      initialValues={{
        text: "",
      }}
      onSubmit={(values, formikHelpers): Promise<any> | void => {
        if (onSubmit) {
          return onSubmit(
            values as PostChatMessageFormData,
            formikHelpers as FormikHelpers<PostChatMessageFormData>
          );
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
        setStatus,
      }) => (
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
          onChange={() => setStatus("")}
        >
          <Form.Group>
            <Form.Control
              as="textarea"
              name="text"
              onBlur={handleBlur}
              value={values.text}
              onChange={handleChange}
            />
          </Form.Group>

          <Button disabled={isSubmitting} type="submit">
            Send
          </Button>
        </Form>
      )}
    </Formik>
  );
};
