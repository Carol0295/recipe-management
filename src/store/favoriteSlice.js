import { createSlice } from '@reduxjs/toolkit';

/**
 * Redux slice to manage a list of favorite items.
 * 
 * State shape:
 * {
 *   items: Array<Object>  // Array of favorite item objects
 * }
 */
const favoritesSlice = createSlice({
  name: 'favorites',  // Slice name used as prefix for generated action types
  initialState: {
    /**
     * @type {Array<Object>}
     * @description Holds the favorite items. Each item is expected to be an object
     *              with at least an `id` property (used for removal).
     */
    items: [],
  },
  reducers: {
    /**
     * Replace the entire favorites list with a new array.
     *
     * @param {Object} state       - Current slice state.
     * @param {Object} action      - Redux action.
     * @param {Array<Object>} action.payload - New array of favorite items.
     */
    replaceFavorites(state, action) {
      state.items = action.payload;
    },

    /**
     * Add a new item to the favorites list.
     *
     * @param {Object} state      - Current slice state.
     * @param {Object} action     - Redux action.
     * @param {Object} action.payload - The item object to add.
     */
    addFavorite(state, action) {
      state.items.push(action.payload);
    },

    /**
     * Remove an item from the favorites list by its `id`.
     *
     * @param {Object} state      - Current slice state.
     * @param {Object} action     - Redux action.
     * @param {string|number} action.payload - The `id` of the item to remove.
     */
    removeFavorite(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// Export generated action creators for use in components or thunks:
//   favoritesActions.replaceFavorites(newArray)
//   favoritesActions.addFavorite(itemObject)
//   favoritesActions.removeFavorite(itemId)
export const favoritesActions = favoritesSlice.actions;

// Export the reducer to be included in the store setup.
export default favoritesSlice.reducer;
