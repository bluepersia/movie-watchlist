import initMovieSearch from "./movieSearch.js";
import { init as initWatchlist } from "./watchlist.js";

const path = window.location.pathname;
if (path === "/" || path.endsWith("index.html")) {
  initMovieSearch();
} else {
  initWatchlist();
}
