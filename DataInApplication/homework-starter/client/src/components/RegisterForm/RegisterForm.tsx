import { FormEvent, useState } from "react";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { register } from "../../api/auth";
import { validateEmail, validateUsername, validatePassword } from "../../utils/validation";
import { User } from "../../types/user";
import "./RegisterForm.css";

interface RegisterFormProps {
  onSuccess?: (user: User) => void;
}

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setUsernameError("");
    setEmailError("");
    setPasswordError("");
    setServerError("");
    
    const usernameValidation = validateUsername(username);
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    if (!usernameValidation.isValid) {
      setUsernameError(usernameValidation.error || "");
    }
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.error || "");
    }
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.error || "");
    }
    
    if (!usernameValidation.isValid || !emailValidation.isValid || !passwordValidation.isValid) {
      return;
    }
    
    setIsLoading(true);
    const response = await register({ username, email, password });
    setIsLoading(false);
    
    if (response.error) {
      setServerError(response.error);
      setUsername("");
      setEmail("");
      setPassword("");
    } else if (response.data) {
      onSuccess?.(response.data);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <FormField label="Имя" errorMessage={usernameError}>
        <input 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
      </FormField>
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
      {serverError && <div className="register-form__error">{serverError}</div>}
      <Button type="submit" isLoading={isLoading} isDisabled={isLoading}>
        Зарегистрироваться
      </Button>
    </form>
  );
};
