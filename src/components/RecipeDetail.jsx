import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { recipesActions } from '../store/recipesSlice';

import RecipeForm from "./RecipeForm";

/**
 * Component to view, edit, or delete a single recipe.
 * @param {Object} props - The component props.
 * @param {Object} props.recipe - The initial recipe data passed from parent.
 */
function RecipeDetail({ recipe: initialRecipe }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for editing mode and current recipe data
  const [isEditing, setIsEditing] = useState(false);
  const [recipe, setRecipe] = useState(initialRecipe);

  const url = import.meta.env.VITE_APP_API_URL
  /**
   * Fetch the latest version of the recipe from the backend.
   */
  const fetchRecipe = async () => {
    try {
      const res = await axios.get(`${url}/recipes/${recipe.id}`);
      setRecipe(res.data.recipe);
      dispatch(recipesActions.setNeedsRefresh(true));
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  /**
   * Update recipe data on the server and refresh local copy.
   * @param {Object} dataToUpdate - The updated recipe data.
   */
  const handleUpdateRecipe = async (dataToUpdate) => {
    try {
      await axios.put(`${url}/recipes/${recipe.id}`, dataToUpdate);
      await fetchRecipe();
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating recipe:", err);
      alert("Error updating recipe");
    }
  };

  /**
   * Delete the recipe after user confirmation.
   * @param {string} recipeId - The ID of the recipe to delete.
   */
  const handleDeleteRecipe = async (recipeId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this recipe?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${url}/recipes/${recipeId}`);
      dispatch(recipesActions.setNeedsRefresh(true));
      navigate('/', { state: { refresh: true } });
    } catch (err) {
      console.error("Error deleting recipe:", err);
      alert("Error deleting recipe");
    }
  };

  /**
   * Render ingredients as a list.
   */
  const renderIngredients = () => (
    <ul className="list-disc pl-5 mb-4">
      {recipe.ingredients?.map((ing, i) => (
        <li key={i}>{ing.quantity} - {ing.name}</li>
      ))}
    </ul>
  );

  /**
   * Render step-by-step instructions.
   */
  const renderSteps = () => (
    <ol className="list-decimal pl-5">
      {recipe.steps?.map((step, i) => (
        <li key={i} className="mb-2">{step.step_text}</li>
      ))}
    </ol>
  );

  return (
    <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
      {isEditing ? (
        <RecipeForm 
            initialData={recipe}
            onSubmit={handleUpdateRecipe}
            submitLabel="save"
        />
      ) : (
        <>
          <h2 className="text-3xl font-bold text-purple-700 mb-4">{recipe.name}</h2>
          <p className="text-gray-700 mb-4">{recipe.description}</p>

          <h3 className="text-xl font-semibold text-purple-600 mb-2">🥕 Ingredients</h3>
          {renderIngredients()}

          <h3 className="text-xl font-semibold text-purple-600 mb-2">📋 Steps:</h3>
          {renderSteps()}

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
            >
              ✏️ Edit
            </button>
            <button
              onClick={() => handleDeleteRecipe(recipe.id)}
              className="px-4 py-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
            >
              🗑️ Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default RecipeDetail;
