import { useState } from "react";
import { Button } from "../Button";
import { logout } from "../../api/auth";
import "./LogoutButton.css";

interface LogoutButtonProps {
  onLogout?: () => void;
}

export const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logout();
    setIsLoading(false);
    
    if (!response.error) {
      onLogout?.();
    }
  };

  return (
    <div className="logout-button">
      <Button kind="secondary" onClick={handleLogout} isLoading={isLoading} isDisabled={isLoading}>
        Выйти
      </Button>
    </div>
  );
};
