import "./index.css";
import Logo from "./components/logo";
import Form from "./components/form";
import PackingList from "./components/packingList";
import Stats from "./components/stats";
import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form items={items} onAddItems={handleAddItems} />
      <PackingList
        items={items}
        setItems={setItems}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}
