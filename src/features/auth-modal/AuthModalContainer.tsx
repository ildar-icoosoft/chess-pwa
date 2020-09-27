import React, { FC } from "react";
import { AuthModal } from "./AuthModal";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

export const AuthModalContainer: FC<unknown> = () => {
  const { isAuthModalVisible } = useSelector(
    (state: RootState) => state.authModal
  );

  return <AuthModal show={isAuthModalVisible} />;
};
