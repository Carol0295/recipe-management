import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import RootLayout from './pages/RootLayout';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import CreateRecipe from './pages/CreateRecipe';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/recipes/:id', element: <RecipeDetails /> },
      { path: '/create', element: <CreateRecipe /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
