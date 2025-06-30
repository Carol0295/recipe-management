import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md px-6 py-4 flex justify-between items-center rounded-b-xl border-b border-purple-200">
      <h1 className="text-2xl font-bold text-purple-700">Recipe Management</h1>

      <nav className="flex gap-6 items-center">
        <Link to="/" className="text-purple-700 hover:text-purple-900 transition-colors text-lg font-medium">📖 Recipes</Link>
        <Link to="/create" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition text-sm font-semibold">+ New Recipe</Link>
      </nav>
    </header>
  );
}