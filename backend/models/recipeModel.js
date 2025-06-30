import pool from "../db/dbConn.js";

/**
 * Retrieves all recipes from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of recipe objects.
 */
export const getAllRecipes = async () => {
    const [rows] = await pool.query('SELECT * FROM recipes');
    return rows;
}

/**
 * Retrieves a single recipe by its ID.
 * @param {number} id - The ID of the recipe to retrieve.
 * @returns {Promise<Object|null>} A promise that resolves to the recipe object, or null if not found.
 */
export const getRecipeById = async (id) => {
  const [recipes] = await pool.query('SELECT * FROM recipes WHERE id = ?', [id]);
  return recipes[0];
}

/**
 * Creates a new recipe using an active database connection (e.g., in a transaction).
 * @param {Object} connection - The database connection object.
 * @param {Object} recipeData - The recipe data.
 * @param {string} recipeData.name - The name of the recipe.
 * @param {string} recipeData.description - The description of the recipe.
 * @returns {Promise<number>} A promise that resolves to the ID of the newly created recipe.
 */
export const createRecipeWithConnection = async (connection, recipeData) => {  
  const query = 'INSERT INTO recipes (name, description) VALUES (?, ?)';
  const [result] = await connection.execute(query, [recipeData.name, recipeData.description]);
  return result.insertId;
};

/**
 * Updates an existing recipe by ID.
 * @param {Object} connection - The database connection object.
 * @param {number} id - The ID of the recipe to update.
 * @param {Object} recipeData - The updated recipe data.
 * @param {string} recipeData.name - The new name of the recipe.
 * @param {string} recipeData.description - The new description of the recipe.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows.
 */
export const updateRecipeFromDB = async (connection, id, recipeData) => {
    const query = 'UPDATE recipes SET name = ?, description = ? WHERE id = ?';
    const [result] = await connection.execute(query, [recipeData.name, recipeData.description, id]);
    return result.affectedRows;
}

/**
 * Deletes a recipe by ID.
 * @param {number} recipeId - The ID of the recipe to delete.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows.
 */
export const deleteRecipeFromDB = async (recipeId) => {
    const query = 'DELETE FROM recipes WHERE id = ?';
    const [result] = await pool.execute(query, [recipeId]);
    return result.affectedRows;
}
