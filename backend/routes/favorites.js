import express from 'express';
import FavoriteController from '../controllers/FavoriteController.js';
import { isValidNumber } from '../utils/validations.js';

const router = express.Router();

/**
 * @route GET /favorites
 * @description Retrieves all favorite recipes from the database.
 * @access Public
 */
router.get(`/favorites`, async (req, res) => {
  try {
    const allFavorites = await FavoriteController.getFavorites();
    console.log('GET ALL FAVORITES -->', allFavorites);
    res.status(200).json({ favorites: allFavorites });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ message: 'Failed to get favorites' });
  }
});

/**
 * @route GET /favorites/:recipeId
 * @description Checks if a specific recipe is in the favorites.
 * @param {number} recipeId - The ID of the recipe to check.
 * @access Public
 */
router.get(`/favorites/:recipeId`, async (req, res) => {
  const recipeId = parseInt(req.params.recipeId);
  if (!isValidNumber(recipeId)) {
    return res.status(400).json({ message: 'Invalid recipe ID' });
  }

  try {
    const favorite = await FavoriteController.isFavorite(recipeId);
    console.log(`CHECK IF RECIPE IS FAVORITE --> ${favorite}`);
    res.status(200).json({ favorite });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ message: 'Failed to check favorite' });
  }
});

/**
 * @route POST /favorites
 * @description Adds a recipe to the favorites.
 * @body { recipeId: number } - The ID of the recipe to add as favorite.
 * @access Public
 */
router.post(`/favorites`, async (req, res) => {
  const { recipeId } = req.body;
  if (!isValidNumber(recipeId)) {
    return res.status(400).json({ message: 'Invalid recipe ID' });
  }

  try {
    const newFavorite = await FavoriteController.addFavorite(recipeId);
    console.log(`POST FOR ADD FAVORITES --> ${newFavorite}`);
    res.status(201).json({ favorite: newFavorite, recipeId: recipeId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Recipe already in favorites' });
    }

    console.error('Error adding favorite:', error);
    res.status(500).json({ message: 'Failed to add favorite' });
  }
});

/**
 * @route DELETE /favorites/:id
 * @description Removes a recipe from the favorites by its favorite ID.
 * @param {number} id - The ID of the favorite entry to delete.
 * @access Public
 */
router.delete(`/favorites/:id`, async (req, res) => {
  const favoriteId = parseInt(req.params.id);
  if (!isValidNumber(favoriteId)) {
    return res.status(400).json({ message: 'Invalid favorite ID' });
  }

  try {
    const deletedFavorite = await FavoriteController.removeFavorite(favoriteId);
    console.log(`DELETE FAVORITES --> ${deletedFavorite}`);
    res.status(200).json(deletedFavorite);
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ message: 'Failed to delete favorite' });
  }
});

export default router;
