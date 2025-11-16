import Card from "./Card";
import { useList } from "./useList";
import "./CardList.css";

function CardList({ initialItems }) {
  const {
    items,
    addItem,
    updateItemTitle,
    toggleItemDone,
    deleteItem,
  } = useList(initialItems);

  return (
    <section className="card-list-wrapper">
      <ul className="card-list">
        {items.map((item) => (
          <li key={item.id} className="card-list__item">
            <Card
              item={item}
              onChangeTitle={updateItemTitle}
              onToggleDone={toggleItemDone}
              onDelete={deleteItem}
            />
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="create-button"
        onClick={addItem}
      >
        Новый элемент
      </button>
    </section>
  );
}

export default CardList;
