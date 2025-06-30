import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { recipesActions } from '../store/recipesSlice';
import RecipeForm from "../components/RecipeForm";
import axios from "axios";

/**
 * CreateRecipe page component.
 * 
 * This component renders the RecipeForm for creating a new recipe.
 * When the form is submitted, it sends a POST request to the backend API to save the new recipe.
 * 
 * Upon successful creation, it:
 * - Dispatches an action to notify the app that recipes need to be refreshed.
 * - Navigates back to the home page ('/') and passes a state to trigger refresh.
 * 
 * If there's an error during creation, it logs the error and alerts the user.
 */
export default function CreateRecipe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const url = import.meta.env.VITE_APP_API_URL;
    /**
     * Handles recipe creation by sending the data to the backend.
     * @param {Object} recipeData - The recipe data submitted from RecipeForm.
     */
    function handleCreateRecipe(recipeData) {
        axios.post(`${url}/recipes`, recipeData)
            .then(() => {
                // Mark that recipes list needs to refresh
                dispatch(recipesActions.setNeedsRefresh(true));

                // Navigate back to home with refresh flag in state
                navigate('/', { state: { refresh: true } });
            })
            .catch(error => {
                console.error("Error creating recipe:", error);
                alert("Something went wrong while saving the recipe.");
            });
    }

    return (
        <RecipeForm onSubmit={handleCreateRecipe} submitLabel='create' />
    );
}
