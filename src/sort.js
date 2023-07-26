import { generateMovieCards } from "./movie.js";

const sortByTitle = () => {
  const cardList = document.querySelector("#card-list");
  const movies = Array.from(cardList.children);

  movies.sort((a, b) => {
    const titleA = a.querySelector("#movie-title").textContent.toLowerCase();
    const titleB = b.querySelector("#movie-title").textContent.toLowerCase();
    return titleA.localeCompare(titleB);
  });

  movies.forEach(movie => cardList.appendChild(movie));
};

const sortByDate = () => {
  const cardList = document.querySelector("#card-list");
  const movies = Array.from(cardList.children);

  movies.sort((a, b) => {
    const dateA = new Date(a.querySelector("#movie-date").textContent.replace("개봉일:", ""));
    const dateB = new Date(b.querySelector("#movie-date").textContent.replace("개봉일:", ""));
    return dateA - dateB;
  });

  movies.forEach(movie => cardList.appendChild(movie));
};

const sortByRating = () => {
  const cardList = document.querySelector("#card-list");
  const movies = Array.from(cardList.children);

  movies.sort((a, b) => {
    const ratingA = parseFloat(a.querySelector("#movie-rating").textContent.replace("평점:", ""));
    const ratingB = parseFloat(b.querySelector("#movie-rating").textContent.replace("평점:", ""));
    return ratingB - ratingA;
  });

  movies.forEach(movie => cardList.appendChild(movie));
};

const resetMovieSort = () => {
  generateMovieCards();
};

const initSortBtns = () => {
  const sortByTitleBtn = document.querySelector("#btn-sort-by-title");
  const sortByDateBtn = document.querySelector("#btn-sort-by-date");
  const sortByRatingBtn = document.querySelector("#btn-sort-by-rating");
  const sortResetBtn = document.querySelector("#btn-sort-reset");

  sortByTitleBtn.addEventListener("click", sortByTitle);
  sortByDateBtn.addEventListener("click", sortByDate);
  sortByRatingBtn.addEventListener("click", sortByRating);
  sortResetBtn.addEventListener("click", resetMovieSort);
};

export default initSortBtns;
