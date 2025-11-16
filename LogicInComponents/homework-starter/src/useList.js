import { useState } from "react";

export function useList(initialItems) {
  const [items, setItems] = useState(initialItems);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      title: "",
      done: false,
    };

    setItems((prev) => [...prev, newItem]);
  };

  const updateItemTitle = (id, newTitle) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: newTitle } : item
      )
    );
  };

  const toggleItemDone = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    items,
    addItem,
    updateItemTitle,
    toggleItemDone,
    deleteItem,
  };
}
