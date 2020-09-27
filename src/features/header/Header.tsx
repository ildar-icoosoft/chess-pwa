import React, { FC, useCallback } from "react";
import User from "../../interfaces/User";
import { Link } from "react-router-dom";
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
    <header className="blog-header py-3">
      <div className="row flex-nowrap justify-content-between align-items-center">
        <div className="offset-4 col-4 text-center">
          <Link className="blog-header-logo text-dark" to="/">
            Chess PWA
          </Link>
        </div>
        <div className="col-4 d-flex justify-content-end align-items-center">
          {currentUser ? (
            <>
              <div className="mr-2">Hi, {currentUser.fullName}</div>
              <Button
                className="btn btn-sm btn-danger mr-2"
                data-testid="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              className="btn btn-sm btn-success mr-2"
              data-testid="login-btn"
              onClick={handleShowAuthModal}
            >
              Login / Register
            </Button>
          )}

          <a
            href="https://github.com/ildar-icoosoft/chess-pwa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={process.env.PUBLIC_URL + "/imgs/GitHub-Mark-32px.png"}
              alt=""
            />
          </a>
        </div>
      </div>
    </header>
  );
};
