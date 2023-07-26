// export const handleSearch = (searchKeyword) => {
//   const movieCards = document.querySelectorAll(".movie-card");

//   movieCards.forEach((card) => {
//     const title = card.querySelector("#movie-title").textContent.toLowerCase();
//     const searchedValue = searchKeyword.toLowerCase();

//     if (title.includes(searchedValue)) {
//       card.style.display = "block";
//     } else {
//       card.style.display = "none";
//     }
//   });
// };
export const handleSearch = (searchKeyword) => {
  const movieCards = document.querySelectorAll(".movie-card");
  let foundMovies = false; // 검색 결과가 있는지 여부를 확인

  movieCards.forEach((card) => {
    const title = card.querySelector("#movie-title").textContent.toLowerCase();
    const searchedValue = searchKeyword.toLowerCase();

    if (title.includes(searchedValue)) {
      card.style.display = "block";
      foundMovies = true; // 검색 결과가 있음을 표시
    } else {
      card.style.display = "none";
    }
  });

  if (!foundMovies) {
    alert("검색되는 영화가 없습니다.");
  }
};
