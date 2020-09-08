import React, { FC, useCallback, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "antd/dist/antd.css";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import { Button, Modal } from "antd";

const App: FC = () => {
  const [modalIsVisible, setModalVisibility] = useState(false);

  const handleOk = () => {
    alert("ok");
  };
  const showModal = useCallback(() => {
    setModalVisibility(true);
  }, []);
  const hideModal = useCallback(() => {
    setModalVisibility(false);
  }, []);

  return (
    <Router>
      <Button type="primary" onClick={showModal}>
        Login / Register
      </Button>
      <Modal
        title="Basic Modal"
        visible={modalIsVisible}
        onOk={handleOk}
        onCancel={hideModal}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
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
