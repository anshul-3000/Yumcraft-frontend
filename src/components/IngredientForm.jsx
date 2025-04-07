import { useState } from "react";

export default function IngredientForm({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) onSearch(input);
  };

  const handleReset = () => setInput("");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 w-full max-w-xl justify-center">
      <input
        type="text"
        className="p-3 rounded text-black w-full"
        placeholder="Enter ingredients, e.g., tomato, basil, cheese"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">Get Recipes</button>
        <button type="button" onClick={handleReset} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">Reset</button>
      </div>
    </form>
  );
}
