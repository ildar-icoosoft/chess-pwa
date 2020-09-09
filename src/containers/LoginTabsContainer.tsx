import React, { FC, useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { LoginForm } from "../components/LoginForm";
import { RegistrationForm } from "../components/RegistrationForm";
import LoginData from "../interfaces/LoginData";
import User from "../interfaces/User";
import { login } from "../services/api";
import { AppContext } from "../App";

export const LoginTabsContainer: FC<unknown> = () => {
  const appContext = useContext(AppContext);

  const doLogin = React.useCallback((values: LoginData) => {
    return login(values as LoginData).then((user: User) => {
      appContext.dispatch({ type: "LOGIN", payload: user });
    });
  }, []);

  return (
    <Tabs transition={false}>
      <Tab eventKey="home" title="Login">
        <LoginForm onSubmit={login} />
      </Tab>
      <Tab eventKey="profile" title="Register">
        <RegistrationForm />
      </Tab>
    </Tabs>
  );
};
