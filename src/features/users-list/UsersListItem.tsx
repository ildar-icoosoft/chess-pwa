import { FC } from "react";
import User from "../../interfaces/User";

export interface UsersListItemProps {
  currentUserId?: number | null;
  user?: User;
}

export const UsersListItem: FC<UsersListItemProps> = () => null;
