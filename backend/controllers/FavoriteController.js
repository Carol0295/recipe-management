import { getAllFavorites, createFavorite, deleteFavoriteById } from '../models/favoriteModel.js';

/**
 * Retrieves all favorite recipes from the database.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of favorite entries.
 */
export const getFavorites = async () => {
  return await getAllFavorites();
};

/**
 * Adds a new favorite recipe by its recipe ID.
 *
 * @param {number} recipe_id - The ID of the recipe to add as a favorite.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly created favorite entry.
 */
export const addFavorite = async (recipe_id) => {
  return await createFavorite(recipe_id);
};

/**
 * Deletes a favorite recipe by its favorite ID.
 *
 * @param {number} id - The ID of the favorite entry to remove.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows (should be 1 if successful).
 */
export const removeFavorite = async (id) => {
  return await deleteFavoriteById(id);
};

// Exports all controller functions as a single object
export default {
  getFavorites,
  addFavorite,
  removeFavorite,
};
