import pool from "../db/dbConn.js";

/**
 * Retrieves all steps for a specific recipe from the database.
 * @param {number} recipeId - The ID of the recipe to fetch steps for.
 * @returns {Promise<Array>} A promise that resolves to an array of step objects.
 */
export const getAllSteps = async (recipeId) => {
    const [rows] = await pool.query('SELECT * FROM steps WHERE recipe_id = ?', [recipeId]);
    return rows;
};

/**
 * Creates a new step record within a transaction connection.
 * @param {Object} connection - The database connection object to use for the transaction.
 * @param {number} recipeId - The ID of the recipe the step belongs to.
 * @param {Object} stepData - The step data containing step number and step text.
 * @param {number} stepData.step_number - The number/order of the step.
 * @param {string} stepData.step_text - The description/text of the step.
 * @returns {Promise<Object>} A promise that resolves to the result of the insert operation.
 */
export const createStepWithConnection = async (connection, recipeId, stepData) => {
    const query = 'INSERT INTO steps (recipe_id, step_number, step_text) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [recipeId, stepData.step_number, stepData.step_text]);
    return result;
};

/**
 * Deletes a step from the database by its ID.
 * @param {Object} conn - The database connection object.
 * @param {number} recipeId - The ID of the recipe 
 * @returns {Promise<number>} A promise that resolves to the number of affected rows.
 */
export const deleteStepFromDB = async (conn, recipeId) => {
    const query = 'DELETE FROM steps WHERE recipe_id = ?';
    const [result] = await conn.execute(query, [recipeId]);
    return result.affectedRows;
};
