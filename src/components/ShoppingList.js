import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [shoppingItems, setShoppingItems] = useState(items);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }
  function handleSearchChange(event) {
    setSearchText(event.target.value);
  }

  function handleItemFormSubmit(newItem) {
    setShoppingItems([...shoppingItems, newItem]);
  }
  
  const itemsToDisplay = shoppingItems.filter((item) => {
    if (selectedCategory === "All" && searchText === "") return true;

    if (selectedCategory !== "All" && item.category !== selectedCategory) return false;

    if (searchText !== "" && !item.name.toLowerCase().includes(searchText.toLowerCase())) return false;

    return true;
  });
  return (
    <div className="ShoppingList">
      <ItemForm  onItemFormSubmit={handleItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange}onSearchChange={handleSearchChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
