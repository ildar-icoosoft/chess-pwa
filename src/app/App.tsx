import React, { FC, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import LoginTabsContainer from "../containers/LoginTabsContainer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./rootReducer";
import { fetchCurrentUser, logout } from "../slices/currentUserSlice";
import { showAuthModal, hideAuthModal } from "../slices/authModalSlice";

const App: FC = () => {
  const dispatch = useDispatch();

  const { currentUser, isLoading, error } = useSelector(
    (state: RootState) => state.currentUser
  );
  const { isAuthModalVisible } = useSelector(
    (state: RootState) => state.authModal
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      {currentUser ? (
        <>
          <div>Hi, {currentUser.fullName}</div>
          <Button variant="primary" onClick={() => dispatch(logout())}>
            Logout
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={() => dispatch(showAuthModal())}>
          Login / Register
        </Button>
      )}

      <Modal
        show={isAuthModalVisible}
        onHide={() => dispatch(hideAuthModal())}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <LoginTabsContainer />
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
