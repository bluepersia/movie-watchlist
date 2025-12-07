import {
  displayMovies,
  fetchMovie,
  init as initMovieList,
  removeMovie,
} from "./movieList.js";

const moviesFromStorage = localStorage.getItem("movies");

let moviesIDs = moviesFromStorage ? JSON.parse(moviesFromStorage) : [];

async function init() {
  const movies = await fetchMovies(moviesIDs);
  displayMovies(movies, { moviesIDs, isWatchlist: true });

  initMovieList(true);
}

function addToWatchlist(imdbID) {
  if (moviesIDs.includes(imdbID)) return;

  console.log(imdbID);
  moviesIDs.push(imdbID);

  localStorage.setItem("movies", JSON.stringify(moviesIDs));
}

function removeFromWatchlist(imdbID, isWatchlist) {
  moviesIDs = moviesIDs.filter((id) => id !== imdbID);

  localStorage.setItem("movies", JSON.stringify(moviesIDs));

  if (isWatchlist) removeMovie(imdbID);
}

async function fetchMovies(moviesIDs) {
  return await Promise.all(
    moviesIDs.map(async (id) => {
      return fetchMovie(id);
    })
  );
}

function getMoviesIDs() {
  return moviesIDs;
}

export { addToWatchlist, init, getMoviesIDs, removeFromWatchlist };
