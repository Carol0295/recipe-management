import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';
import favoriteReducer from './favoriteSlice';

/**
 * Configures the Redux store for the application.
 * 
 * The store contains two slices of state:
 * - `recipes`: Managed by `recipesReducer`, contains all recipe-related state.
 * - `favorites`: Managed by `favoriteReducer`, handles the user's favorite recipes.
 */
const store = configureStore({
  reducer: {
    recipes: recipesReducer,     // Access via state.recipes
    favorites: favoriteReducer // Access via state.favorites
  },
});

export default store;
