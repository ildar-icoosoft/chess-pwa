import React, { FC } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { LoginForm } from "../components/LoginForm";
import { RegistrationForm } from "../components/RegistrationForm";

export const LoginTabsContainer: FC<unknown> = () => {
  return (
    <Tabs transition={false}>
      <Tab eventKey="home" title="Login">
        <LoginForm />
      </Tab>
      <Tab eventKey="profile" title="Register">
        <RegistrationForm />
      </Tab>
    </Tabs>
  );
};
