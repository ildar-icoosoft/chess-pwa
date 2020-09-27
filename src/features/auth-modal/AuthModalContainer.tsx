import React, { FC, useCallback } from "react";
import { AuthModal } from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { hideAuthModal } from "./authModalSlice";

export const AuthModalContainer: FC<unknown> = () => {
  const { isAuthModalVisible } = useSelector(
    (state: RootState) => state.authModal
  );

  const dispatch = useDispatch();

  const handleHide = useCallback(() => {
    dispatch(hideAuthModal());
  }, [dispatch]);

  return <AuthModal show={isAuthModalVisible} onHide={handleHide} />;
};
