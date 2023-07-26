const cardList = document.querySelector("#card-list");

export const generateMovieCards = async () => {
  const movies = await fetchMovieData();

  const IMG_URL = `https://image.tmdb.org/t/p/w400`;

  cardList.innerHTML = movies
    .map(
      (movie) => `
              <li class="movie-card" id=${movie.id}>
              <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
              <div class="movie-info">                
                <h3 id="movie-title">${movie.title}</h3>
                <p id="movie-rating" class="rating">평점: ${movie.vote_average}</p>
                <p id="movie-date" class="release-date">개봉일: ${movie.release_date}</p>
              </div>
              </li>`,
    )
    .join("");

  const handleClickCard = (event) => {
    const targetCard = event.target.closest(".movie-card");
    if (targetCard) {
      const movieId = targetCard.id;
      window.open(`detail.html?id=${movieId}`, "_blank");
    }
  };
  cardList.addEventListener("click", handleClickCard);

  const handleMouseEnter = (event) => {
    // 이벤트가 발생한 요소 중 가장 가까운 movie-cared의 부모 요소를 찾음.
    const targetCard = event.target.closest(".movie-card");
    // 유효성 검사
    if (targetCard) {
      // targetCard 내에서 movie-info 클래스를 가진 요소를 찾고
      // block을 통해 화면에 표시
      targetCard.querySelector(".movie-info").style.display = "block";
    }
  };

  const handleMouseLeave = (event) => {
    const targetCard = event.target.closest(".movie-card");
    if (targetCard) {
      // targetCard 내에서 movie-info 클래스를 가진 요소를 찾고
      // block을 통해 화면에서 숨김
      targetCard.querySelector(".movie-info").style.display = "none";
    }
  };

  cardList.addEventListener("mouseenter", handleMouseEnter);
  cardList.addEventListener("mouseleave", handleMouseLeave);

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

  const API_URL = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KO&page=1`;

  const response = await fetch(API_URL, options);
  const data = await response.json();
  return data.results;
};
