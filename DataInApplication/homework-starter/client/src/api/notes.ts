import { NotesResponse, CreateNoteData, Note } from "../types/note";

const API_BASE_URL = "http://localhost:4000";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const getNotes = async (page: number = 1): Promise<ApiResponse<NotesResponse>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes?page=${page}`, {
      credentials: "include",
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { error: errorData.message || "Ошибка получения заметок" };
      } catch {
        return { error: `Ошибка получения заметок (${response.status})` };
      }
    }

    try {
      const data = await response.json();
      return { data };
    } catch {
      return { error: "Ошибка обработки данных" };
    }
  } catch (error) {
    return { error: "Ошибка сети. Проверьте подключение" };
  }
};

export const createNote = async (noteData: CreateNoteData): Promise<ApiResponse<Note>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(noteData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return { error: errorData.message || "Ошибка создания заметки" };
      } catch {
        return { error: `Ошибка создания заметки (${response.status})` };
      }
    }

    try {
      const data = await response.json();
      return { data };
    } catch {
      return { error: "Ошибка обработки данных" };
    }
  } catch (error) {
    return { error: "Ошибка сети. Проверьте подключение" };
  }
};
