import initializeDatabase from './db/setup.js';
import recipesRoute from './routes/recipes.js';
import favorites from './routes/favorites.js';
import bodyParser from 'body-parser';
import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

// Initialize the database and create required tables if they don't exist
initializeDatabase();

const app = express(); // Create an Express application
const port = process.env.PORT || 3000; // Use the port from .env or default to 3000

/**
 * Enable Cross-Origin Resource Sharing (CORS)
 * Allows requests from the frontend at http://localhost:5173
 */
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Needed if using cookies/auth headers
}));

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

/**
 * Register API routes
 * All recipe-related routes are handled under /api/recipes
 * All favourite-related routes are handled under /api/favourites
 */
app.use('/api', recipesRoute);
app.use('/api', favorites);

/**
 * Fallback middleware for handling undefined routes
 * Returns a 404 JSON response for unmatched routes
 */
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next(); // Ignore OPTIONS requests (CORS preflight)
  }
  res.status(404).json({ message: '404 - Not Found' });
});

/**
 * Start the server and listen on the configured port
 */
app.listen(port);
console.log(`App listens on PORT ${port} with nodemon server!`);
