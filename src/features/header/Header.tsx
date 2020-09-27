import React, { FC, useCallback } from "react";
import User from "../../interfaces/User";
import { Button } from "react-bootstrap";

export interface HeaderProps {
  currentUser?: User | null;
  onLogout?(): void;
  onShowAuthModal?(): void;
}

export const Header: FC<HeaderProps> = ({
  currentUser = null,
  onLogout,
  onShowAuthModal,
}) => {
  const handleLogout = useCallback(() => {
    if (onLogout) {
      onLogout();
    }
  }, [onLogout]);

  const handleShowAuthModal = useCallback(() => {
    if (onShowAuthModal) {
      onShowAuthModal();
    }
  }, [onShowAuthModal]);

  return (
    <>
      {currentUser ? (
        <>
          <div>Hi, {currentUser.fullName}</div>
          <Button
            variant="primary"
            data-testid="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <Button
          variant="primary"
          data-testid="login-btn"
          onClick={handleShowAuthModal}
        >
          Login / Register
        </Button>
      )}
    </>
  );
};
