import { User } from "../../types/user";
import "./UserView.css";

interface UserViewProps {
  user: User;
}

export const UserView = ({ user }: UserViewProps) => {
  const username = user.username;

  return (
    <div className="user-view">
      <div className="user-view__logo">
        {username.slice(0, 1).toUpperCase()}
      </div>
      <span className="user-view__name">{username}</span>
    </div>
  );
};
