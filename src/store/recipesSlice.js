/**
 * recipesSlice.js
 *
 * This file defines the Redux slice for managing recipes in the application.
 * It stores the array of recipe items and a `needsRefresh` flag used to determine
 * if the recipe list should be refetched from the backend (e.g., after creating or editing a recipe).
 *
 * Uses Redux Toolkit's `createSlice` to simplify reducer and action creation.
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the recipes slice.
 * @typedef {Object} RecipesState
 * @property {Array<Object>} items - List of recipe objects.
 * @property {boolean} needsRefresh - Flag indicating if the recipe list needs to be refreshed.
 */
const initialState = {
  items: [],           // Array of recipes
  needsRefresh: false, // Whether the recipe list should be updated
};

/**
 * Slice to handle recipe-related state and actions.
 */
const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    /**
     * Replace the current list of recipes with a new array.
     *
     * @param {RecipesState} state - Current slice state.
     * @param {Object} action
     * @param {Array<Object>} action.payload - New array of recipe objects.
     */
    setRecipes(state, action) {
      state.items = action.payload;
      state.needsRefresh = false;
    },

    /**
     * Set the `needsRefresh` flag to true or false.
     * This is useful to indicate that the frontend should re-fetch recipes after an update.
     *
     * @param {RecipesState} state - Current slice state.
     * @param {Object} action
     * @param {boolean} action.payload - New value for the refresh flag.
     */
    setNeedsRefresh(state, action) {
      state.needsRefresh = action.payload;
    },

    // Additional reducers like `addRecipe`, `editRecipe`, `deleteRecipe` could be added here in the future.
  },
});

// Export the generated action creators (e.g. recipesActions.setRecipes)
export const recipesActions = recipesSlice.actions;

// Export the reducer to be added to the Redux store
export default recipesSlice.reducer;
