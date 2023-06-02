// 카드 만들기 기능

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500/';
const API_URL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=e0d3c2c49e1911d0470e8c5beca2f42d&language=en-US&page=1';
const movieCard = document.getElementById('movie-card');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMGQzYzJjNDllMTkxMWQwNDcwZThjNWJlY2EyZjQyZCIsInN1YiI6IjY0NzA4YThiNzI2ZmIxMDBhOGIyMzEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vOslGcwovsO57s5cOU8cEmvDJ6ECwIqkA-WPS1pA1-Y',
  },
};

movieCard.innerHTML = '';

fetch(API_URL, options)
  .then((data) => data.json())
  .then((data) => {
    let moviesData = data['results'];
    moviesData.forEach((movieData) => {

            // let title = a['title'];
            // let id = a['id'];
            // let overview = a['overview'];
            // let rate = a['vote_average'];
            // let image = IMAGE_URL + a['poster_path'];
            // const movies = { title, id, overview, rate, image };
            // 위 내용을 아래 const로 변경할 수 있음

      const {title, id, overview, vote_average:rate} = movieData

      let image = IMAGE_URL + movieData['poster_path'];

      const movieAdd = document.createElement('div');
      movieAdd.classList.add('movies');
      movieAdd.innerHTML = `
                <div class="movie-info">
                <a href="#"><p onclick="alert('영화 id : ${id}')">
                <img src="${image}" class="image" alt="image" />
                <h3 class="title">${title}</h3>
                <h5 class="overview">${overview}</h5>
                <span class="rate">${rate}</span>
                </p></a></div>
        `;
        // 위 innerHTML을 createElement로 하나씩 만들어보면 좋은 연습이 될 수 있음

      movieCard.appendChild(movieAdd);
    }); 
  });

// 검색 기능 : https://www.youtube.com/watch?v=ZFUOC-y4i0s 참고하여 작업
// filter 함수를 사용해서 작업하는 것을 추천

const search = () => {
  const searchbox = document.getElementById('search-input').value.toUpperCase();
  const movieitems = document.getElementById('movie-list');
  const movieList = document.querySelectorAll('.movie-info');
  const movieTitle = movieitems.getElementsByTagName('h3');

  for (let i = 0; i < movieTitle.length; i++) {
    let match = movieList[i].getElementsByTagName('h3')[0];

    if (match) {
      let textvalue = match.textContent || match.innerHTML;

      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        movieList[i].style.display = '';
      } else {
        movieList[i].style.display = 'none';
      }
    }
  }
};

function enterkey() {
  if (window.event.keyCode == 13) {
    search();
  }
}
// 숫자에는 각 기능이 설정되어 있어서 13을 사용하는 것
