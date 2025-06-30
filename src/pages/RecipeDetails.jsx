import { useParams } from "react-router-dom";
import RecipeDetail from "../components/RecipeDetail";
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * RecipeDetails component
 *
 * This component fetches and displays the details of a specific recipe based on the recipe ID from the URL.
 * It uses React Router to extract the route parameter and Axios to perform the API request.
 *
 * Features:
 * - Uses `useParams` to access the dynamic recipe ID from the route.
 * - Fetches the recipe data from the backend API when the component mounts or the ID changes.
 * - Displays a loading message while the data is being fetched.
 * - Passes the fetched recipe to the `RecipeDetail` component for rendering.
 */
export default function RecipeDetails() {

  // Get the recipe ID from the route parameters (e.g. /recipes/:id)
  const { id } = useParams();

  // Local state to store the fetched recipe data
  const [recipe, setRecipe] = useState(null);

  // Fetch the recipe details when the component mounts or the ID changes
  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API_URL}/recipes/${id}`);
        setRecipe(res.data.recipe); // Update state with the fetched recipe
      } catch (error) {
        console.error('Error loading recipe details:', error);
      }
    }

    fetchRecipe();
  }, [id]);

  // Show a loading indicator while the recipe is being fetched
  if (!recipe) return <p className="p-4 text-purple-700">Loading...</p>;

  // Render the recipe details using the RecipeDetail component
  return (
    <div>
      <RecipeDetail recipe={recipe} />
    </div>
  );
}
