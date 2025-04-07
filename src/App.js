import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';

export default function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecipes = async () => {
    if (!ingredients.trim()) {
      toast.error('Please enter some ingredients!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/recommend', {
        ingredients: ingredients.split(',').map((i) => i.trim()),
      });
      setRecipes(response.data);
      toast.success('Recipes fetched successfully!');
    } catch (error) {
      console.error('Error fetching recipes:', error);
      toast.error('Failed to fetch recipes.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setIngredients('');
    setRecipes([]);
    toast('Reset complete.', { icon: '🔄' });
  };

  const saveRecipe = (recipe) => {
    if (!savedRecipes.find((r) => r.name === recipe.name)) {
      setSavedRecipes([...savedRecipes, recipe]);
      toast.success('Recipe saved!');
    } else {
      toast('Recipe already saved.', { icon: '🔁' });
    }
  };

  const unsaveRecipe = (recipe) => {
    const updated = savedRecipes.filter((r) => r.name !== recipe.name);
    setSavedRecipes(updated);
    toast('Recipe removed.', { icon: '❌' });
  };

  return (
    <div
      className="min-h-screen text-gray-900"
      style={{
        backgroundImage: "url('/background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar savedCount={savedRecipes.length} />
      <Toaster position="top-right" />

      <div className="bg-black bg-opacity-50 min-h-screen px-6 pt-28 pb-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-2 mb-6"
          >
            <input
              type="text"
              className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring focus:border-indigo-400"
              placeholder="Enter ingredients, separated by commas"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button
              onClick={getRecipes}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition duration-300 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Get Recipes'}
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition duration-300"
            >
              Reset
            </button>
          </motion.div>

          <div className="grid gap-6 mb-10">
            <AnimatePresence>
              {recipes.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white bg-opacity-90 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <h2 className="text-2xl font-semibold mb-2">{recipe.name}</h2>
                  <img
                    src={recipe.image_url}
                    alt={recipe.name}
                    className="w-full h-40 object-cover rounded-xl mb-4"
                  />
                  <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                  <button
                    onClick={() => saveRecipe(recipe)}
                    className="mt-3 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
                  >
                    Save Recipe
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {savedRecipes.length > 0 && (
            <div className="mt-10">
              <h2 className="text-3xl text-white font-bold mb-4">Saved Recipes</h2>
              <div className="grid gap-6">
                {savedRecipes.map((recipe, index) => (
                  <div
                    key={index}
                    className="bg-white bg-opacity-90 p-4 rounded-xl shadow-md"
                  >
                    <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
                    <img
                      src={recipe.image_url}
                      alt={recipe.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                    <button
                      onClick={() => unsaveRecipe(recipe)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Unsave
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
