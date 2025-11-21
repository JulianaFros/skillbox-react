export interface Note {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: number;
}

export interface NotesResponse {
  list: Note[];
  pageCount: number;
}

export interface CreateNoteData {
  title: string;
  text: string;
}
