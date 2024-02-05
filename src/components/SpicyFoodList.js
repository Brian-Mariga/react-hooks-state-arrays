import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilterBy] = useState("All");

  function handleFilter(e) {
    setFilterBy(e.target.value);
  }

  const foodToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });

  function handleAddFood() {
    const newFood = [...foods, getNewRandomSpicyFood()];
    setFoods(newFood);
  }

  function handleClick(id) {
    const newFoodArray = foodToDisplay.filter((food) => food.id !== id);
    setFoods(newFoodArray);
    console.log(newFoodArray);
  }

  function handleUpdate(id) {
    const newFood = foods.map((food) => {
      if (food.id === id) {
        return { ...food, heatLevel: food.heatLevel + 1 };
      } else {
        return { food };
      }
    });
    setFoods(newFood);
  }

  const foodList = foods.map((food) => (
    <li key={food.id}>
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      <button onClick={() => handleClick(food.id)}>Delete</button>
      <button onClick={() => handleUpdate(food.id)}>Add Heat</button>
    </li>
  ));

  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <select name="filter" onChange={handleFilter}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
