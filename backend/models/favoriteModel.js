import pool from "../db/dbConn.js";

/**
 * Retrieves all favorite entries from the database.
 * 
 * @returns {Promise<Array>} A promise that resolves to an array of favorite records.
 */
export const getAllFavorites = async () => {
  const [rows] = await pool.query('SELECT * FROM favorites');
  return rows;
};

/**
 * Inserts a new favorite associated with a given recipe ID.
 *
 * @param {number} recipeId - The ID of the recipe to mark as favorite.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly inserted favorite.
 */
export const createFavorite = async (recipeId) => {
  const query = 'INSERT INTO favorites (recipe_id) VALUES (?)';
  const [result] = await pool.execute(query, [recipeId]);
  return result.insertId; // Return the new favorite ID
};

/**
 * Deletes a favorite entry from the database by its ID.
 *
 * @param {number} favoriteId - The ID of the favorite to delete.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows (1 if deleted successfully).
 */
export const deleteFavoriteById = async (favoriteId) => {
  const query = 'DELETE FROM favorites WHERE id = ?';
  const [result] = await pool.execute(query, [favoriteId]);
  return result.affectedRows;
};

// Export all functions as a default object (optional if used as a module)
export default {
  getAllFavorites,
  createFavorite,
  deleteFavoriteById,
};
