const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to MongoDB
        await client.connect();

        // Access the database and collection
        const database = client.db('routeData');
        const collection = database.collection('routeMovies');

        // Fetch the startingMovie JSON
        const startingMovie = await collection.findOne({ type: 'startingMovie' });

        // Fetch the endingMovie JSON
        const endingMovie = await collection.findOne({ type: 'endMovie' });

        // Store movie data in variables
        const startingMovieData = startingMovie ? startingMovie.movieData : null;
        const endingMovieData = endingMovie ? endingMovie.movieData : null;

        // Log or use the data as needed
        console.log('Starting Movie:', startingMovieData);
        console.log('Ending Movie:', endingMovieData);

        // Respond with both movies as JSON
        res.status(200).json({
            startingMovie: startingMovieData,
            endingMovie: endingMovieData
        });
        const startingFilmName = startingMovie.title;
        const endingFilmName = endingMovie.title;
        const pageTitle = `${startingFilmName} to ${endingFilmName} - ReelRoute`;
        localStorage.setItem('title',pageTitle);

    } catch (error) {
        // Handle any errors
        console.error('Error fetching movies:', error);
        res.status(500).json({ error: 'Error fetching movies from MongoDB' });
    } finally {
        // Close the MongoDB connection
        await client.close();
    }
}