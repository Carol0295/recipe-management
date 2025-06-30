import express from 'express';
import recipeController from '../controllers/RecipeController.js';
import { isValidText, isNonEmptyArray } from '../utils/validations.js';

const router = express.Router();

/**
 * @route GET /recipes
 * @description Retrieves all recipes from the database.
 * @access Public
 */
router.get('/recipes', async (req, res) => {
  try {
    const allRecipes = await recipeController.getRecipes();
    res.status(200).json(allRecipes);
  } catch (error) {
    console.error('Error fetching recipes', error);
    res.status(500).json({ message: 'Failed to get recipes' });
  }
});

/**
 * @route GET /recipes/:id
 * @description Retrieves the details of a single recipe by its ID.
 * @param {number} id - Recipe ID from the URL parameters.
 * @access Public
 */
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipeDetail = await recipeController.getRecipeDetails(req.params.id);
    res.status(200).json({ recipe: recipeDetail });
  } catch (error) {
    console.error('Error fetching recipe details: ', error);
    res.status(500).json({ message: 'Recipe not found' });
  }
});

/**
 * @route POST /recipes
 * @description Creates a new recipe with its ingredients and steps.
 * @body { name: string, description: string, ingredients: array, steps: array }
 * @access Public
 */
router.post('/recipes', async (req, res) => {
  const { name, description, ingredients, steps } = req.body;

  // Input validation
  if (
    !isValidText(name, 3, 100) ||
    !isValidText(description, 5, 100) ||
    !isNonEmptyArray(ingredients) ||
    !isNonEmptyArray(steps)
  ) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  try {
    const newRecipe = await recipeController.createFullRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error('Error creating recipe', error);
    res.status(500).json({ message: 'Failed to create recipe' });
  }
});

/**
 * @route PUT /recipes/:id
 * @description Updates an existing recipe by its ID.
 * @param {number} id - Recipe ID from the URL parameters.
 * @body Updated recipe fields (name, description, ingredients, steps, etc.)
 * @access Public
 */
router.put('/recipes/:id', async (req, res) => {
  try {
    const updateRecipe = await recipeController.editFullRecipe(req.params.id, req.body);
    console.log(`Update was successful: ${updateRecipe}`);
    res.status(200).json({ recipes: updateRecipe });
  } catch (error) {
    console.error('Error updating recipe', error);
    res.status(500).json({ message: 'Failed to update recipe' });
  }
});

/**
 * @route DELETE /recipes/:id
 * @description Deletes a recipe from the database by its ID.
 * @param {number} id - Recipe ID from the URL parameters.
 * @access Public
 */
router.delete('/recipes/:id', async (req, res) => {
  try {
    const deletedRecipe = await recipeController.deleteRecipe(req.params.id);
    res.status(200).json({ recipes: deletedRecipe });
  } catch (error) {
    console.error('Error deleting recipe', error);
    res.status(500).json({ message: 'Failed to delete recipe' });
  }
});

export default router;
