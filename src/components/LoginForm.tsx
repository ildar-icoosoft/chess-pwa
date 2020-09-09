import React, { FC, FormEvent, useContext } from "react";
import { Formik } from "formik";
import { Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { login } from "../services/api";
import LoginData from "../interfaces/LoginData";
import { AppContext } from "../App";
import User from "../interfaces/User";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password length must be >= 6")
    .required("Required"),
});

export const LoginForm: FC<unknown> = () => {
  const appContext = useContext(AppContext);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log("login request");
        login(values as LoginData)
          .then((user: User) => {
            console.log("login okkkk", user);
            appContext.dispatch({ type: "LOGIN", payload: user });
          })
          .catch((err) => {
            console.log("login err", err);
          })
          .finally(() => {
            console.log("login finally");
            setSubmitting(false);
          });
      }}
    >
      {({
        errors,
        values,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e as FormEvent<HTMLFormElement>)}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && !!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && !!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};
