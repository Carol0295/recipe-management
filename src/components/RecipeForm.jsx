import { useRef, useState, useEffect } from "react";
import { isNotEmpty, hasMinLength } from '../util/validation';

/**
 * RecipeForm component allows creating or editing a recipe.
 * It manages form inputs for title, description, ingredients, and steps.
 * 
 * Props:
 * - initialData: Optional. If provided, pre-fills the form for editing.
 * - onSubmit: Function called with recipe data when form is submitted.
 * - submitLabel: Optional label for the submit button (default: "save").
 */
export default function RecipeForm({ initialData, onSubmit, submitLabel = "save" }) {
    // State for recipe title and description
    const [title, setTitle] = useState(initialData?.name || '');
    const [description, setDescription] = useState(initialData?.description || '');

    // State and refs for ingredients input management
    const [ingredients, setIngredients] = useState(initialData?.ingredients || []);
    const ingredientInput = useRef();
    const ingredientQuantityInput = useRef();

    // State and ref for steps input management
    const [steps, setSteps] = useState(initialData?.steps || []);
    const stepInput = useRef();

    // Update recipe data if initialData changes (useful for editing)
    useEffect(() => {
        if (initialData) {
            setTitle(initialData?.name || '');
            setDescription(initialData?.description || '');
            // setIngredients(initialData.ingredients || []);
            // setSteps(initialData.steps || []);
        }
    }, [initialData]);

    /**
     * Adds a new ingredient to the ingredients list if input is valid.
     */
    function handleAddIngredient() {
        const ingredient = ingredientInput.current.value.trim();
        const quantity = ingredientQuantityInput.current.value.trim();

        if (isNotEmpty(ingredient) && hasMinLength(ingredient, 3) && isNotEmpty(quantity)) {
            setIngredients(prev => [...prev, { name: ingredient, quantity }]);
            ingredientInput.current.value = '';
            ingredientQuantityInput.current.value = '';
        }
    }

    /**
     * Updates the name or quantity of an ingredient at the given index.
     * @param {number} index - Index of the ingredient to update.
     * @param {string} field - Field to update ("name" or "quantity").
     * @param {string} value - New value for the field.
     */
    function handleIngredientChange(index, field, value) {
        setIngredients(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    }

    /**
     * Adds a new step to the steps list if input is valid.
     */
    function handleAddStep() {
        const stepText = stepInput.current.value.trim();

        if (isNotEmpty(stepText) && hasMinLength(stepText, 3)) {
            setSteps(prev => [...prev, { step_number: prev.length + 1, step_text: stepText }]);
            stepInput.current.value = '';
        }
    }

    /**
     * Updates the text of a step at the given index.
     * Also ensures step numbering is consistent.
     * @param {number} index - Index of the step to update.
     * @param {string} value - New text for the step.
     */
    function handleStepChange(index, value) {
        setSteps(prev => {
            const copy = [...prev];
            copy[index] = { ...copy[index], step_text: value, step_number: index + 1 };
            return copy;
        });
    }

    /**
     * Handles form submission.
     * Validates title and description, then calls onSubmit prop with recipe data.
     */
    function handleSubmit(e) {
        e.preventDefault();

        if (!isNotEmpty(title) || !hasMinLength(title, 3)) {
            return;
        }

        if (!isNotEmpty(description) || !hasMinLength(description, 3)) {
            return;
        }

        if (ingredients.length === 0) {
            alert("Please add at least one ingredient.");
            return;
        }

        // for (const ing of ingredients) {
        //     if (!isNotEmpty(ing.name) || !hasMinLength(ing.name, 3)) {
        //         alert("Each ingredient name must be at least 3 characters.");
        //         return;
        //     }
        //     if (!isNotEmpty(ing.quantity)) {
        //         alert("Each ingredient must have a quantity.");
        //         return;
        //     }
        // }

        if (steps.length === 0) {
            alert("Please add at least one step.");
            return;
        }

        // for (const step of steps) {
        //     if (!isNotEmpty(step.step_text) || !hasMinLength(step.step_text, 3)) {
        //         alert("Each step must have at least 3 characters.");
        //         return;
        //     }
        // } 


        const recipeData = {
            name: title,
            description: description,
            ingredients: ingredients,
            steps: steps,
        };

        onSubmit(recipeData);
    }

    return (
        <form onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-16 bg-white/90 backdrop-blur-md border border-purple-300 rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-purple-700 mb-6 text-center">{initialData ? 'Edit recipe' : 'Create recipe'}</h2>
            
            <div className="space-y-5">
                {/* Title input */}
                <div>
                    <label htmlFor="recipe-title" className="block mb-1 font-semibold text-purple-700">Title </label>
                    <input
                        id="recipe-title"
                        type="text"
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                {/* Description input */}
                <div>
                    <label htmlFor="recipe-description" className="block mb-1 font-semibold text-purple-700">Description </label>
                    <input
                        id="recipe-description"
                        type="text"
                        name="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                {/* Ingredients section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-purple-700">Ingredients</label>
                    <div className="flex gap-4 mt-2">
                        <input ref={ingredientInput} type="text" placeholder="Ingredient name" className="flex-1 rounded-md border p-2" />
                        <input ref={ingredientQuantityInput} type="number" placeholder="Quantity" min="1" className="w-24 rounded-md border p-2" />
                        <button type="button" onClick={handleAddIngredient} className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700">+ Add</button>
                    </div>

                    {ingredients.map((item, index) => (
                        <div key={index} className="flex gap-2 mt-1">
                            <input
                                type="text"
                                value={item.name}
                                onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                                className="flex-1 rounded-md border p-2"
                            />
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                onChange={(e) => handleIngredientChange(index, "quantity", e.target.value)}
                                className="w-24 rounded-md border p-2"
                            />
                        </div>
                    ))}

                </div>

                {/* Steps section */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-purple-700">Steps</label>
                    <div className="flex gap-4 mt-2">
                        <input ref={stepInput} type="text" placeholder="New step" className="flex-1 rounded-md border p-2" />
                        <button type="button" onClick={handleAddStep} className="bg-purple-600 text-white px-3 py-2 rounded-md hover:bg-purple-700">+ Add</button>
                    </div>
                    {steps.map((item, index) => (
                        <input
                            key={index}
                            type="text"
                            value={item.step_text}
                            onChange={(e) => handleStepChange(index, e.target.value)}
                            className="w-full rounded-md border p-2 mb-1 mt-1"
                        />
                    ))}
                </div>

                {/* Submit button */}
                <button type="submit" className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg shadow transition">
                    {submitLabel}
                </button>
            </div>
        </form>
    );
}
