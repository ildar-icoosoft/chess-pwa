import React, { FC, useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { LoginForm } from "../components/LoginForm";
import {
  RegistrationForm,
  RegistrationFormData,
} from "../components/RegistrationForm";
import LoginData from "../interfaces/LoginData";
import User from "../interfaces/User";
import { login, register } from "../services/api";
import { AppContext } from "../App";

export const LoginTabsContainer: FC<unknown> = () => {
  const appContext = useContext(AppContext);

  const doLogin = React.useCallback((values: LoginData) => {
    return login(values).then((user: User) => {
      appContext.dispatch({ type: "LOGIN", payload: user });
    });
  }, []);

  const doSignUp = React.useCallback((values: RegistrationFormData) => {
    return register({
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    }).then((user: User) => {
      appContext.dispatch({ type: "LOGIN", payload: user });
    });
  }, []);

  return (
    <Tabs transition={false}>
      <Tab eventKey="home" title="Login">
        <LoginForm onSubmit={doLogin} />
      </Tab>
      <Tab eventKey="profile" title="Register">
        <RegistrationForm onSubmit={doSignUp} />
      </Tab>
    </Tabs>
  );
};
