export default function RecipeCard({ recipe, isFavorite, onToggleFavorite, onView }){
    return (
        <>
            <div key={recipe.id} className="backdrop-blur-md bg-white/30 border border-white/40 rounded-xl p-5 shadow-lg transition-transform transform hover:-translate-y-1 hover:shadow-xl">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-700 text-sm">{recipe.description}</p>
                <div className="mt-5 flex gap-3">
                    {/* Favorite Button */}
                    <button
                    onClick={() => onToggleFavorite(recipe.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium shadow transition-colors ${
                        isFavorite
                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    >
                    {isFavorite ? '💖 Remove' : '🤍 Add'}
                    </button>

                    {/* View Button */}
                    <button
                    onClick={() => onView(recipe.id)}
                    className="px-4 py-2 rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 shadow text-sm font-medium"
                    >
                    🔍 View Recipe
                    </button>
                </div>
            </div>
        </>
    );
}