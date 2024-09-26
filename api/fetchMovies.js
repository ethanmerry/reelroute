// api/fetchMovies.js
import fetch from 'node-fetch';
import { writeFile } from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const apiKey = process.env.TMDB_API_KEY;

  try {
    // Fetch popular movies from TMDB API
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();

    // Select two popular movies
    const movies = data.results;
    const startingMovie = movies[0];
    const endMovie = movies[1];

    // Define paths for saving JSON files
    const startingMoviePath = path.join('/tmp', 'startingMovie.json');
    const endMoviePath = path.join('/tmp', 'endMovie.json');

    // Save the movies as JSON files
    await writeFile(startingMoviePath, JSON.stringify(startingMovie, null, 2));
    await writeFile(endMoviePath, JSON.stringify(endMovie, null, 2));

    // Respond with success message and file paths
    res.status(200).json({
      message: 'Movies fetched and saved successfully!',
      startingMoviePath,
      endMoviePath
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ message: 'Error fetching movies' });
  }
}
