const moviesFromStorage = localStorage.getItem("movies");

let moviesIDs = moviesFromStorage ? JSON.parse(moviesFromStorage) : [];

function addToWatchlist(imdbID) {
  if (moviesIDs.includes(imdbID)) return;

  console.log(imdbID);
  moviesIDs.push(imdbID);

  localStorage.setItem("movies", JSON.stringify(moviesIDs));
}

export { addToWatchlist };
