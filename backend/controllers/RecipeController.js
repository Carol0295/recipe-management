import { getAllRecipes, getRecipeById, createRecipeWithConnection, deleteRecipeFromDB, updateRecipeFromDB } from '../models/recipeModel.js';
import IngredientsController from './IngredientsController.js';
import StepsController from './StepsController.js';
import pool from '../db/dbConn.js';

/**
 * Fetches all recipes from the database.
 * @returns {Promise<Array>} List of recipes.
 */
export const getRecipes = async () => {
    return await getAllRecipes();
};

/**
 * Fetches full details for a specific recipe, including ingredients and steps.
 * @param {number} recipeId - ID of the recipe to retrieve.
 * @returns {Promise<Object>} Recipe with its ingredients and steps.
 * @throws {Error} If the recipe does not exist.
 */
export const getRecipeDetails = async (recipeId) => {
  const recipe = await getRecipeById(recipeId);
  if (!recipe) {
    throw new Error('Recipe not found');
  }

  const ingredients = await IngredientsController.getIngredients(recipeId);
  const steps = await StepsController.getSteps(recipeId);

  return {
    ...recipe,
    ingredients,
    steps,
  };
};

/**
 * Deletes a recipe from the database.
 * @param {number} recipeId - ID of the recipe to delete.
 * @returns {Promise<void>}
 */
export const deleteRecipe = async (recipeId) => {
    return await deleteRecipeFromDB(recipeId);
};

/**
 * Updates basic recipe data (name, description).
 * Used internally by `editFullRecipe`.
 * @param {object} conn - Active MySQL connection.
 * @param {number} id - ID of the recipe to update.
 * @param {object} data - New recipe data.
 * @returns {Promise<void>}
 */
export const updateRecipe = async (conn, id, data) => {
  return await updateRecipeFromDB(conn, id, data);
};

/**
 * Creates a new recipe along with its ingredients and steps inside a transaction.
 * @param {object} recipeData - Recipe data including `name`, `description`, `ingredients`, and `steps`.
 * @returns {Promise<object>} Object with success flag and created recipe ID.
 * @throws {Error} If any step fails during creation.
 */
export const createFullRecipe = async (recipeData) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // 1. Insert recipe into `recipes` table
    const recipeId = await createRecipeWithConnection(connection, recipeData);

    // 2. Insert ingredients
    if (recipeData.ingredients && recipeData.ingredients.length > 0) {
      for (const ingredient of recipeData.ingredients) {
        await IngredientsController.addNewIngredient(connection, recipeId, ingredient);
      }
    }

    // 3. Insert steps
    if (recipeData.steps && recipeData.steps.length > 0) {
      for (const step of recipeData.steps) {
        await StepsController.addNewStep(connection, recipeId, step);
      }
    }

    // 4. Commit the transaction
    await connection.commit();
    connection.release();

    return { success: true, recipeId };
  } catch (error) {
    // Rollback on error
    await connection.rollback();
    connection.release();
    console.error('Error in createFullRecipe:', error);
    throw error;
  }
};

/**
 * Edits a full recipe (main data, ingredients and steps) using a transaction.
 * Replaces all previous ingredients and steps.
 * @param {number} recipeId - ID of the recipe to update.
 * @param {object} recipeData - Updated recipe data.
 * @returns {Promise<object>} Object with success flag and updated recipe ID.
 * @throws {Error} If any step fails during the update.
 */
export const editFullRecipe = async (recipeId, recipeData) => {
  console.log('recipe data: ', recipeData );
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    
    // 1. Update main recipe info
    await updateRecipe(connection, recipeId, recipeData);
    
    // 2. Remove existing ingredients
    await IngredientsController.deleteIngredient(connection, recipeId);

    // 3. Insert new ingredients
    if (recipeData.ingredients && recipeData.ingredients.length > 0) {
      for (const ingredient of recipeData.ingredients) {
        await IngredientsController.addNewIngredient(connection, recipeId, ingredient);
      }
    }

    // 4. Remove existing steps
    await StepsController.deleteStep(connection, recipeId);

    // 5. Insert new steps
    if (recipeData.steps && recipeData.steps.length > 0) {
      for (const step of recipeData.steps) {
        await StepsController.addNewStep(connection, recipeId, step);
      }
    }

    // 6. Commit the transaction
    await connection.commit();
    connection.release();

    return { success: true, recipeId };
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('❌ Error in updateFullRecipe:', error);
    throw error;
  }
};

// Export all controllers together (for convenience)
export default {
  getRecipes,
  getRecipeDetails,
  deleteRecipe,
  createFullRecipe,
  editFullRecipe
};
