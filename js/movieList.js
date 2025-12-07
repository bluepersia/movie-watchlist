import { addToWatchlist } from "./watchlist.js";

function generateMovieHTML(movie, isWatchlist = false) {
  return `
   <article class="movie-card movie-card--btm-border" data-imdb-ID="${
     movie.imdbID
   }">
                <div class="movie-card__content">
                  <header class="movie-card__head">
                    <h3 class="movie-card__title">${movie.Title}</h3>
                    <img
                      class="movie-card__star"
                      src="img/star-icon.png"
                      alt=∂""
                      aria-hidden="true"
                    />
                    <span class="movie-card__rating" aria-label="rating"
                      >${movie.imdbRating}</span
                    >
                  </header>
                  <div class="movie-card__details">
                    <span class="movie-card__length">${movie.Runtime}</span>
                    <span class="movie-card__categories"
                      >${movie.Genre}</span
                    >
                    ${
                      !isWatchlist
                        ? `
                    <button
                      aria-label="Add to watchlist"
                      class="movie-card__add-to-watchlist"
                      data-add-to-watchlist="true"
                    >
                      <img
                        class="movie-card__add-to-watchlist-icon"
                        src="img/add-to-watchlist.png"
                        alt=""
                        aria-hidden="true"
                      />
                      Watchlist
                    </button>`
                        : `
                <button
                      aria-label="Remove from watchlist"
                      class="movie-card__remove-from-watchlist"
                    >
                      <img
                        class="movie-remove-from-watchlist-icon"
                        src="img/remove-from-watchlist.png"
                        alt=""
                        aria-hidden="true"
                      />
                      Watchlist
                    </button>`
                    }
                  </div>
                  <p class="movie-card__description">
                    ${movie.Plot}
                  </p>
                </div>
                <img
                  class="movie-card__image"
                  src="${movie.Poster}"
                  alt=""
                  aria-hidden="true"
                />
              </article>
    `;
}

const movieList = document.getElementById("movie-list");
const msgArea = document.getElementById("msg-area");

function init() {
  movieList.addEventListener("click", (e) => {
    if (e.target.dataset.addToWatchlist) {
      const closestMovieEl = e.target.closest("[data-imdb-ID]");
      addToWatchlist(closestMovieEl.dataset.imdbId);
    }
  });
}

async function fetchMovie(imdbID) {
  const movieUrl = `http://www.omdbapi.com/?apikey=ce9b1429&i=${imdbID}`;
  const movieResponse = await fetch(movieUrl);
  const movieData = await movieResponse.json();
  return movieData;
}

function displayMovies(movies) {
  if (movies.length) {
    msgArea.style.display = "none";
    movieList.innerHTML = "";

    movies.forEach((movie) => {
      const movieHTML = generateMovieHTML(movie);
      const liEl = document.createElement("li");
      liEl.classList.add("films-section__list-item");
      liEl.innerHTML = movieHTML;
      movieList.appendChild(liEl);
    });
  } else {
    msgArea.style.display = "block";
    msgArea.innerHTML = `
            <h3 class="films-section__msg-title">Unable to find what you’re looking for. Please try another search.</h3>`;
  }
}
export { displayMovies, init, fetchMovie };
