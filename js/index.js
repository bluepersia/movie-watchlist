import initMovieSearch from "./movieSearch.js";

const path = window.location.pathname;
if (path === "/" || path.endsWith("index.html")) {
  initMovieSearch();
}
