import React from 'react';

export default function RecipeCard({ recipe, onSave }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
      <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded mb-2" />
      <a
        href={recipe.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline mb-2"
      >
        View Recipe
      </a>
      {onSave && (
        <button
          onClick={() => onSave(recipe)}
          className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Save
        </button>
      )}
    </div>
  );
}
