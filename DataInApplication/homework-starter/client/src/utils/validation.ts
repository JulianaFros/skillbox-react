export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: "Email обязателен" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Некорректный формат email" };
  }
  
  return { isValid: true };
};

export const validateUsername = (username: string): ValidationResult => {
  if (!username) {
    return { isValid: false, error: "Имя пользователя обязательно" };
  }
  
  if (username.length < 5) {
    return { isValid: false, error: "Имя должно содержать минимум 5 символов" };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: "Пароль обязателен" };
  }
  
  if (password.length < 8) {
    return { isValid: false, error: "Пароль должен содержать минимум 8 символов" };
  }
  
  return { isValid: true };
};

export const validateLoginEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: "Email обязателен" };
  }
  
  if (email.length < 5) {
    return { isValid: false, error: "Email должен содержать минимум 5 символов" };
  }
  
  return { isValid: true };
};

export const validateTitle = (title: string): ValidationResult => {
  if (!title) {
    return { isValid: false, error: "Заголовок обязателен" };
  }
  
  if (title.length < 5) {
    return { isValid: false, error: "Заголовок должен содержать минимум 5 символов" };
  }
  
  return { isValid: true };
};

export const validateNoteText = (text: string): ValidationResult => {
  if (!text) {
    return { isValid: false, error: "Текст заметки обязателен" };
  }
  
  if (text.length < 10) {
    return { isValid: false, error: "Текст должен содержать минимум 10 символов" };
  }
  
  if (text.length > 300) {
    return { isValid: false, error: "Текст должен содержать максимум 300 символов" };
  }
  
  return { isValid: true };
};
