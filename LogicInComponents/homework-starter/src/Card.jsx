import { useEffect, useRef } from "react";
import "./Card.css";

function Card({ item, onChangeTitle, onToggleDone, onDelete }) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && item.title === "") {
      inputRef.current.focus();
    }
  }, []);

  const handleTitleChange = (event) => {
    onChangeTitle(item.id, event.target.value);
  };

  const handleTitleBlur = () => {
    if (item.title.trim() === "") {
      onDelete(item.id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onToggleDone(item.id);
    }
  };

  const handleToggleDone = () => {
    onToggleDone(item.id);
  };

  return (
    <div className="card">
      <input
        type="checkbox"
        className="card__done"
        checked={item.done}
        onChange={handleToggleDone}
      />

      <input
        ref={inputRef}
        type="text"
        className="card__title"
        value={item.title}
        onChange={handleTitleChange}
        onBlur={handleTitleBlur}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Card;
