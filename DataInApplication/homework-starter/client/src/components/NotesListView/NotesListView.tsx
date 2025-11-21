import "./NotesListView.css";
import { NoteView } from "../NoteView";
import { Loader } from "../Loader";
import { Note } from "../../types/note";

interface NotesListViewProps {
  notes: Note[];
  isLoading?: boolean;
  error?: string;
}

export const NotesListView = ({ notes, isLoading, error }: NotesListViewProps) => {
  console.log('NotesListView render:', { 
    notesCount: notes.length, 
    isLoading, 
    error,
    notes 
  });
  
  if (isLoading) {
    return (
      <div className="note-list-view__state">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="note-list-view__state">
        <p className="note-list-view__error">{error}</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="note-list-view__state">
        <p className="note-list-view__empty">Заметок пока нет</p>
      </div>
    );
  }

  return (
    <ul className="note-list-view">
      {notes.map((note) => (
        <li key={note.id}>
          <NoteView note={note} />
        </li>
      ))}
    </ul>
  );
};
