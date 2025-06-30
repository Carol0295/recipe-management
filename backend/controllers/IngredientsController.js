import { getAllIngredients, deleteIngredientFromDB, createIngredientWithConnection } from '../models/ingredientModel.js';

/**
 * Retrieves all ingredients for a given recipe.
 * @param {number} recipeId - The ID of the recipe to get ingredients for.
 * @returns {Promise<Array>} A promise that resolves to an array of ingredient objects.
 */
export const getIngredients = async (recipeId) => {
    return await getAllIngredients(recipeId);
};

/**
 * Creates a new ingredient for a specific recipe using a database connection (e.g., during a transaction).
 * @param {Object} conn - The database connection object.
 * @param {number} recipeId - The ID of the recipe to add the ingredient to.
 * @param {Object} data - The ingredient data.
 * @param {string} data.name - The name of the ingredient.
 * @param {string|number} data.quantity - The quantity of the ingredient.
 * @returns {Promise<Object>} A promise that resolves to the result of the insert operation.
 */
export const addNewIngredient = async (conn, recipeId, data) => {
    return await createIngredientWithConnection(conn, recipeId, data);
};

/**
 * Deletes an ingredient by its ID.
 * @param {Object} conn - The database connection object.
 * @param {number} id - The ID of the ingredient to delete.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows.
 */
export const deleteIngredient = async (conn, id) => {
    return await deleteIngredientFromDB(conn, id);
};

export default {
  getIngredients,
  addNewIngredient,
  deleteIngredient,
};
