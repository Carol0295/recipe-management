import pool from "../db/dbConn.js";

/**
 * Retrieves all ingredients for a specific recipe from the database.
 * @param {number} recipeId - The ID of the recipe to get ingredients for.
 * @returns {Promise<Array>} A promise that resolves to an array of ingredient objects.
 */
export const getAllIngredients = async (recipeId) => {
    const [rows] = await pool.query('SELECT * FROM ingredients WHERE recipe_id = ?', [recipeId]);
    return rows;
};

/**
 * Creates a new ingredient record within a transaction connection.
 * @param {Object} connection - The database connection object to use for the transaction.
 * @param {number} recipeId - The ID of the recipe the ingredient belongs to.
 * @param {Object} ingredientsData - The ingredient data containing name and quantity.
 * @param {string} ingredientsData.name - The name of the ingredient.
 * @param {string|number} ingredientsData.quantity - The quantity of the ingredient.
 * @returns {Promise<Object>} A promise that resolves to the result of the insert operation.
 */
export const createIngredientWithConnection = async (connection, recipeId, ingredientsData) => {
    const query = 'INSERT INTO ingredients (recipe_id, name, quantity) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [recipeId, ingredientsData.name, ingredientsData.quantity]);
    return result;
};

/**
 * Deletes an ingredient from the database by its ID.
 * @param {Object} conn - The database connection object.
 * @param {number} ingredientId - The ID of the ingredient to delete.
 * @returns {Promise<number>} A promise that resolves to the number of affected rows.
 */
export const deleteIngredientFromDB = async (conn, recipeId) => {
    const query = 'DELETE FROM ingredients WHERE recipe_id = ?';
    const [result] = await conn.execute(query, [recipeId]);
    return result.affectedRows;
};
