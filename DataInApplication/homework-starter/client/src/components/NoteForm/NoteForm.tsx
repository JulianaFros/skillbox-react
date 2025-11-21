import { FormEvent, useState } from "react";
import { FormField } from "../FormField";
import { Button } from "../Button";
import { createNote } from "../../api/notes";
import { validateTitle, validateNoteText } from "../../utils/validation";
import { Note } from "../../types/note";
import "./NoteForm.css";

interface NoteFormProps {
  onSuccess?: (note: Note) => void;
}

export const NoteForm = ({ onSuccess }: NoteFormProps) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  
  const [titleError, setTitleError] = useState("");
  const [textError, setTextError] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setTitleError("");
    setTextError("");
    setServerError("");
    
    const titleValidation = validateTitle(title);
    const textValidation = validateNoteText(text);
    
    if (!titleValidation.isValid) {
      setTitleError(titleValidation.error || "");
    }
    if (!textValidation.isValid) {
      setTextError(textValidation.error || "");
    }
    
    if (!titleValidation.isValid || !textValidation.isValid) {
      return;
    }
    
    setIsLoading(true);
    const response = await createNote({ title, text });
    setIsLoading(false);
    
    console.log('Create note response:', response);
    
    if (response.error) {
      console.error('Error creating note:', response.error);
      setServerError(response.error);
    } else if (response.data) {
      console.log('Note created successfully:', response.data);
      setTitle("");
      setText("");
      onSuccess?.(response.data);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <FormField label="Заголовок" errorMessage={titleError}>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </FormField>
      <FormField label="Текст" errorMessage={textError}>
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
          rows={5}
        />
      </FormField>
      {serverError && <div className="note-form__error">{serverError}</div>}
      <Button type="submit" isLoading={isLoading} isDisabled={isLoading}>
        Сохранить
      </Button>
    </form>
  );
};
