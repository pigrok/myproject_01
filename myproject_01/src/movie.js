export const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  const cardList = document.querySelector("#card-list");
  cardList.innerHTML = movies
    .map(
      movie => `
            <li class="movie-card" id=${movie.id}>
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3 class="movie-title">${movie.title}</h3>
                <p>개봉일: ${movie.release_date}</p>
                <p>평점: ${movie.vote_average}</p>
            </li>`,
    )
    .join("");

  const handleClickCard = event => {
    const targetCard = event.target.closest(".movie-card");
    if (targetCard) {
      const movieId = targetCard.id;
      window.open(`detail.html?id=${movieId}`, "_blank");
    }
  };
  cardList.addEventListener("click", handleClickCard);

  return movies;
};

export const fetchMovieData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY5MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU",
    },
  };
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?language=ko-KO&page=1",
    options,
  );
  const data = await response.json();
  return data.results;
};