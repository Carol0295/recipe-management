/**
 * favorites-actions.js
 *
 * This file contains asynchronous action creators (thunks) for managing favorite recipes.
 * These thunks interact with the backend API using axios to fetch, add, or delete favorite items,
 * and dispatch corresponding actions to update the Redux store.
 *
 * Dependencies:
 * - axios for HTTP requests
 * - Redux Toolkit's `favoritesActions` to update the store
 * - Environment variable `VITE_APP_API_URL` for the backend base URL
 */

import { favoritesActions } from './favoriteSlice';
import axios from 'axios';

const url = import.meta.env.VITE_APP_API_URL;

/**
 * Thunk to fetch all favorite recipes from the backend API.
 * Dispatches `replaceFavorites` to update the Redux store.
 *
 * @returns {Function} Thunk function.
 */
export const fetchFavorites = () => {
  return async (dispatch) => {
    try {
      // Make GET request to fetch all favorites
      const response = await axios.get(`${url}/favorites`);

      // Dispatch action to update Redux store with fetched favorites
      dispatch(favoritesActions.replaceFavorites(response.data.favorites));
    } catch (error) {
      console.error('Fetching favorites failed:', error);
    }
  };
};

/**
 * Thunk to add a recipe to the favorites list.
 * Sends a POST request and refetches the favorites list.
 *
 * @param {string|number} recipeId - ID of the recipe to be added as favorite.
 * @returns {Function} Thunk function.
 */
export const addFavorite = (recipeId) => {
  return async (dispatch) => {
    try {
      // Send POST request to add recipeId as a favorite
      const response = await axios.post(`${url}/favorites`, { recipeId });

      // Refresh the favorites list from backend
      dispatch(fetchFavorites());
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('This recipe is already a favorite!');
        return;
      }
      console.error('Adding favorites failed:', error);
    }
  };
};

/**
 * Thunk to remove a recipe from the favorites list.
 * Sends a DELETE request and updates the Redux store.
 *
 * @param {string|number} favoriteId - ID of the favorite item to be removed.
 * @returns {Function} Thunk function.
 */
export const deleteFavorite = (favoriteId) => {
  return async (dispatch) => {
    try {
      // Send DELETE request to remove the favorite by ID
      await axios.delete(`${url}/favorites/${favoriteId}`);

      // Update Redux store by removing the item locally
      dispatch(favoritesActions.removeFavorite(favoriteId));
    } catch (error) {
      console.error('Deleting favorites failed:', error);
    }
  };
};
