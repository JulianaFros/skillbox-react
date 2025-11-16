import CardList from "./CardList";
import "./App.css";

const initialItems = [
  { id: 1, title: "Хлеб", done: false },
  { id: 2, title: "Молоко", done: true },
  { id: 3, title: "Сметана", done: false },
];

function App() {
  return (
    <main className="app">
      <h1 className="app__title">Список покупок</h1>
      <CardList initialItems={initialItems} />
    </main>
  );
}

export default App;
