import { useState, useRef, useEffect, useCallback } from "react";

const INITIAL_LIST = [
  { id: 1, title: "Хлеб", done: false },
  { id: 2, title: "Молоко", done: true },
  { id: 3, title: "Сметана", done: false },
];

export function useList() {
  const [list, setList] = useState(INITIAL_LIST);

  const inputRefs = useRef({});
  const lastCreatedId = useRef(null);

  const createItem = () => {
    const id = Date.now();

    const newItem = {
      id,
      title: "",
      done: false,
    };

    setList((prevList) => [...prevList, newItem]);
    lastCreatedId.current = id;
  };

  /**
   * Установить заголовок элемента.
   *
   * @param id - ID элемента.
   * @param title - Заголовок элемента.
   */
  const setItemTitle = (id, title) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, title } : item
      )
    );
  };

  /**
   * Переключить выполненность элемента.
   *
   * @param id - ID элемента.
   */
  const toggleItem = (id) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  /**
   * Удалить элемент.
   *
   * @param id - ID элемента.
   */
  const deleteItem = (id) => {
    setList((prevList) => prevList.filter((item) => item.id !== id));
    delete inputRefs.current[id];
  };

   const registerInputRef = (id) => (element) => {
    if (element) {
      inputRefs.current[id] = element;
    }
  };

   useEffect(() => {
    if (lastCreatedId.current == null) return;

    const input = inputRefs.current[lastCreatedId.current];
    if (input) {
      input.focus();
      lastCreatedId.current = null;
    }
  });

  return {
    list,
    createItem,
    setItemTitle,
    toggleItem,
    deleteItem,
    registerInputRef,
  };
}
