import React, { FC, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../pages/HomePage";
import GamePage from "../pages/GamePage";
import LoginTabsContainer from "../features/auth-modal/LoginTabsContainer";
import { RootState } from "./rootReducer";
import { fetchCurrentUser } from "../features/current-user/currentUserSlice";
import { hideAuthModal } from "../features/auth-modal/authModalSlice";
import { watchGames } from "../features/data-subscription/dataSubscriptionSlice";
import { startGameClock } from "../features/game-clock/gameClockSlice";
import HeaderContainer from "../features/header/HeaderContainer";

const App: FC = () => {
  const dispatch = useDispatch();

  const { isAuthModalVisible } = useSelector(
    (state: RootState) => state.authModal
  );

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(watchGames());
    dispatch(startGameClock());
  }, [dispatch]);

  return (
    <Router>
      <HeaderContainer />

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
