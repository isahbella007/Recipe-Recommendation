import React, { useEffect, useState } from "react";
import useRecipe from "../../Hook/useRecipe";
import "./Page.css";
const Page = () => {
  const [query, setQuery] = useState("");
  const { searchQuery, error, isLoading, recipes } = useRecipe();

  const submitQuery = (event) => {
    event.preventDefault();
    searchQuery(query);
  };

  return (
    <div>
      {!recipes && (
        <div>
          {!isLoading && (
            <>
              <input
                placeholder="search"
                onChange={(e) => setQuery(e.target.value)}
              ></input>
              <button onClick={submitQuery}>click</button>
            </>
          )}
          {isLoading && "Loading..."}
        </div>
      )}

      {recipes && (
        <table>
          <thead>
            <tr>
              <td>Recipe Name</td>
              <td>Recipe Link</td>
              <td>Ingredients</td>
            </tr>
          </thead>
          <tbody>
            {recipes?.map((recipe) => (
              <tr>
                <td>{recipe.recipe_name}</td>
                <td>{recipe.recipe_link}</td>
                <td>{recipe.ingredients}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default Page;
