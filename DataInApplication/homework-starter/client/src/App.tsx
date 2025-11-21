import { useEffect, useState } from "react";
import "./App.css";
import { AuthForm } from "./components/AuthForm";
import { UserView } from "./components/UserView";
import { LogoutButton } from "./components/LogoutButton";
import { Loader } from "./components/Loader";
import { NotesListView } from "./components/NotesListView";
import { NoteForm } from "./components/NoteForm";
import { User } from "./types/user";
import { Note } from "./types/note";
import { getCurrentUser } from "./api/auth";
import { getNotes } from "./api/notes";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await getCurrentUser();
      if (response.data) {
        setUser(response.data);
      }
      setIsAuthLoading(false);
    };

    checkAuth();
  }, []);

  const { state: notesState, isLoading, isError, isSuccess, refetch } = useFetch(
    () => getNotes(0),
    { autoFetch: false }
  );

  useEffect(() => {
    if (user) {
      console.log('User logged in, fetching notes...');
      refetch();
    }
  }, [user]);

  useEffect(() => {
    console.log('Notes state updated:', { 
      status: notesState.status, 
      isSuccess, 
      isLoading, 
      isError,
      data: isSuccess ? notesState.data : null,
      notesList: isSuccess ? notesState.data.list : null,
      notesCount: isSuccess ? notesState.data.list.length : 0
    });
  }, [notesState, isSuccess, isLoading, isError]);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleNoteCreated = (note: Note) => {
    console.log('Note created:', note);
    refetch();
  };

  if (isAuthLoading) {
    return (
      <div className="app">
        <Loader />
      </div>
    );
  }

  return (
    <div className="app">
      {user ? (
        <div className="app__main-container">
          <div className="app__header">
            <UserView user={user} />
            <LogoutButton onLogout={handleLogout} />
          </div>
          <div className="app__content">
            <NoteForm onSuccess={handleNoteCreated} />
            <NotesListView
              notes={isSuccess ? notesState.data.list : []}
              isLoading={isLoading}
              error={isError ? notesState.error : undefined}
            />
          </div>
        </div>
      ) : (
        <AuthForm onSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;
