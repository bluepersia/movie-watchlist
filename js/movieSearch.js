import {
  displayMovies,
  fetchMovie,
  init as initMovieList,
} from "./movieList.js";

function init() {
  initMovieList();

  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchQuery = formData.get("search");
    handleSearch(searchQuery);
  });
}

async function handleSearch(searchQuery) {
  const movies = await fetchMovies(searchQuery);
  displayMovies(movies);
}

async function fetchMovies(searchQuery) {
  const url = `http://www.omdbapi.com/?apikey=ce9b1429&s=${searchQuery}`;
  const response = await fetch(url);
  const data = await response.json();
  return await Promise.all(
    data.Search.map(async (movie) => {
      return fetchMovie(movie.imdbID);
    })
  );
}

export default init;
