import { generateMovieCards } from "./movie.js";
import { handleSearch } from "./search.js";
import initSortBtns from "./sort.js";

generateMovieCards();
initSortBtns();

const searchInput = document.querySelector("#search-input");
searchInput.focus();

const form = document.querySelector("#search-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  handleSearch(searchInput.value);
});

