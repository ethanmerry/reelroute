document.addEventListener('DOMContentLoaded', () => {
  fetch('startingMovie.json')
    .then(response => response.json())
    .then(startingMovieData => {
      const startingFilmName = startingMovieData.title;
      return fetch('endMovie.json')
        .then(response => response.json())
        .then(endMovieData => {
          const endingFilmName = endMovieData.title;
          const pageTitle = `${startingFilmName} to ${endingFilmName} - ReelRoute`;
          document.title = pageTitle;
        })
        .catch(error => {
          console.error('Error reading endMovie.json:', error);
        });
    })
    .catch(error => {
      console.error('Error reading startingMovie.json:', error);
    });
});
