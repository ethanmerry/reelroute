const fetch = require('node-fetch');
const { MongoClient } = require('mongodb');

// Create a MongoDB client instance
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = async function handler(req, res) {
  const apiKey = process.env.TMDB_API_KEY;

  try {
    // Fetch popular movies from TMDB API
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`);
    const data = await response.json();

    // Select two popular movies
    const movies = data.results;
    const startingMovie = movies[0];
    const endMovie = movies[1];

    // Connect to MongoDB
    await client.connect();
    const database = client.db('myDatabase');  // Replace with your database name
    const collection = database.collection('movies');

    // Clear previous day's data (if exists) and insert new data
    await collection.deleteMany({}); // Delete all existing documents
    await collection.insertOne({
      date: new Date(),
      startingMovie,
      endMovie,
    });

    res.status(200).json({ message: 'Movies saved to MongoDB successfully!' });
  } catch (error) {
    console.error('Error fetching movies or saving to MongoDB:', error);
    res.status(500).json({ message: 'Error fetching movies or saving to MongoDB' });
  } finally {
    await client.close(); // Ensure the MongoDB client is closed
  }
};
