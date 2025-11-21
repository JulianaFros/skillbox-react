import { FormEvent, useState } from "react";
import "./LoginForm.css";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { login } from "../../api/auth";
import { validateLoginEmail, validatePassword } from "../../utils/validation";
import { User } from "../../types/user";

interface LoginFormProps {
  onSuccess?: (user: User) => void;
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setEmailError("");
    setPasswordError("");
    setServerError("");
    
    const emailValidation = validateLoginEmail(email);
    const passwordValidation = validatePassword(password);
    
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "");
    }
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || "");
    }
    
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      return;
    }
    
    setIsLoading(true);
    const response = await login({ email, password });
    setIsLoading(false);
    
    if (response.error) {
      setServerError(response.error);
      setEmail("");
      setPassword("");
    } else if (response.data) {
      onSuccess?.(response.data);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <FormField label="Email" errorMessage={emailError}>
        <input 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormField>
      <FormField label="Пароль" errorMessage={passwordError}>
        <input 
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormField>
      {serverError && <div className="login-form__error">{serverError}</div>}
      <Button type="submit" isLoading={isLoading} isDisabled={isLoading}>
        Войти
      </Button>
    </form>
  );
};
