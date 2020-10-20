import { FC } from "react";
import User from "../../interfaces/User";

export interface UsersListProps {
  currentUserId?: number | null;
  users?: User[];
  isLoading?: boolean;
  error?: string | null;
}

export const UsersList: FC<UsersListProps> = () => null;
