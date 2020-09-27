import React, { FC } from "react";
import { Header } from "./Header";
import User from "../../interfaces/User";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { denormalize } from "normalizr";
import userSchema from "../../normalizr/schemas/userSchema";

const HeaderContainer: FC<unknown> = () => {
  const currentUser: User | null = useSelector((state: RootState) => {
    if (state.currentUser.userId) {
      return denormalize(state.currentUser.userId, userSchema, state.entities);
    }
    return null;
  });

  return <Header currentUser={currentUser} />;
};

export default HeaderContainer;
