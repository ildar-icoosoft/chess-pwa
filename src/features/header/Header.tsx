import React, { FC } from "react";
import User from "../../interfaces/User";
import { Button } from "react-bootstrap";
import { logout } from "../current-user/currentUserSlice";
import { showAuthModal } from "../auth-modal/authModalSlice";
import { useDispatch } from "react-redux";

export interface HeaderProps {
  currentUser?: User | null;
}

export const Header: FC<HeaderProps> = ({ currentUser = null }) => {
  const dispatch = useDispatch();

  return (
    <>
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
    </>
  );
};
