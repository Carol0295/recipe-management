// React and Redux hooks
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// Redux actions
import { recipesActions } from '../store/recipesSlice';
import { addFavorite, deleteFavorite, fetchFavorites } from "../store/favorites-actions";

// Axios for HTTP requests
import axios from "axios";

// UI component for rendering each recipe
import RecipeCard from "./RecipeCard";

function Recipes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Global state selectors
  const recipes = useSelector(state => state.recipes.items);
  const needsRefresh = useSelector(state => state.recipes.needsRefresh);
  const favorites = useSelector(state => state.favorites.items ?? []);

  const url = import.meta.env.VITE_APP_API_URL;
  /**
   * Fetch all recipes from the backend API.
   * Memoized to avoid unnecessary re-creation.
   */
  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get(`${url}/recipes`);
      dispatch(recipesActions.setRecipes(response.data));
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  }, [dispatch]);

  /**
   * Toggle favorite status for a specific recipe.
   * If it's already a favorite, remove it; otherwise, add it.
   */
  const toggleFavoriteHandler = useCallback((recipeId) => {
    const isFavorite = favorites.some(fav => fav.recipe_id === recipeId);

    if (isFavorite) {
      const fav = favorites.find(fav => fav.recipe_id === recipeId);
      dispatch(deleteFavorite(fav.id));
    } else {
      dispatch(addFavorite(recipeId));
    }
  }, [dispatch, favorites]);

  /**
   * Fetch recipes and favorites once when the component mounts.
   */
  useEffect(() => {
    fetchRecipes();
    dispatch(fetchFavorites());
  }, [fetchRecipes, dispatch]);

  /**
   * If the "needsRefresh" flag is set (e.g. after creating/editing a recipe),
   * re-fetch the recipes from the backend.
   */
  useEffect(() => {
    if (needsRefresh) {
      fetchRecipes();
    }
  }, [needsRefresh, fetchRecipes]);

  /**
   * Render the list of recipes using RecipeCard components.
   * Each card includes a favorite toggle and a link to the recipe details.
   */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-100 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-purple-700">🍰 My recipes</h1>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.some(fav => fav.recipe_id === recipe.id)}
            onToggleFavorite={toggleFavoriteHandler}
            onView={(id) => navigate(`/recipes/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
