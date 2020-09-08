import React, { FC, useCallback, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import { LoginForm } from "./components/LoginForm";
import { Button, Modal } from "react-bootstrap";

const App: FC = () => {
  const [modalIsVisible, setModalVisibility] = useState(false);

  const showModal = useCallback(() => {
    setModalVisibility(true);
  }, []);
  const hideModal = useCallback(() => {
    setModalVisibility(false);
  }, []);

  return (
    <Router>
      <Button variant="primary" onClick={showModal}>
        Login / Register
      </Button>
      <Modal show={modalIsVisible} onHide={hideModal} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/game/:id">
            <GamePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
