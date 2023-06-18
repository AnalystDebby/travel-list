import { useState } from "react";

export default function PackingList({
  items,
  setItems,
  onDeleteItem,
  onToggleItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  function onClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              value={item.packed}
              onChange={() => onToggleItems(item.id)}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}
