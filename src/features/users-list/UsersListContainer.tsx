import React, { FC } from "react";
import { UsersList } from "./UsersList";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";
import { denormalize } from "normalizr";
import userSchema from "../../normalizr/schemas/userSchema";

const UsersListContainer: FC<unknown> = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.currentUser.userId
  );

  const users = useSelector((state: RootState) =>
    denormalize(state.usersList.items, [userSchema], state.entities)
  );

  const isLoading = useSelector(
    (state: RootState) => state.usersList.isLoading
  );
  const error = useSelector((state: RootState) => state.usersList.error);

  return (
    <UsersList
      users={users}
      isLoading={isLoading}
      error={error}
      currentUserId={currentUserId}
    />
  );
};

export default UsersListContainer;
