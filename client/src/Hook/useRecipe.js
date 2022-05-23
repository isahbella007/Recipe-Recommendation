import  {useState} from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/recipes";
const useRecipe = () => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState();

  const searchQuery = async (query) => {
    console.log("coming from hook", query);
    setLoading(true);
    // make the request to the api
    await axios
      .get(`${BASE_URL}?q=${query}`)
      .then((response) => {
        setRecipes(response.data);
        
        // console.log(response.data);
      })
      .catch((err) => {
        console.log("could not fetch data");
        setError(true);
      });
  };

  

  return {
    searchQuery,
    error,
    isLoading,
    recipes,
  };
};

export default useRecipe;
