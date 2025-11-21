import { User, LoginCredentials, RegisterCredentials } from "../types/user";

const API_BASE_URL = "http://localhost:4000";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const login = async (credentials: LoginCredentials): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { error: errorData.message || "Ошибка авторизации" };
      } catch {
        return { error: `Ошибка авторизации (${response.status})` };
      }
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: "Ошибка сети. Проверьте подключение" };
  }
};

export const register = async (credentials: RegisterCredentials): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { error: errorData.message || "Ошибка регистрации" };
      } catch {
        const text = await response.text();
        return { error: text || `Ошибка регистрации (${response.status})` };
      }
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: "Ошибка сети. Проверьте подключение" };
  }
};

export const logout = async (): Promise<ApiResponse<void>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      return { error: "Ошибка выхода из системы" };
    }

    return {};
  } catch (error) {
    return { error: "Ошибка сети. Проверьте подключение" };
  }
};

export const getCurrentUser = async (): Promise<ApiResponse<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      credentials: "include",
    });

    if (!response.ok) {
      return { error: "Не авторизован" };
    }

    try {
      const data = await response.json();
      return { data };
    } catch {
      return { error: "Ошибка получения данных пользователя" };
    }
  } catch (error) {
    return { error: "Ошибка сети. Проверьте подключение" };
  }
};
