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
    let rows = data['results'];
    rows.forEach((a) => {
      let title = a['title'];
      let id = a['id'];
      let overview = a['overview'];
      let rate = a['vote_average'];
      let image = IMAGE_URL + a['poster_path'];
      const movies = { title, id, overview, rate, image };

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

      movieCard.appendChild(movieAdd);
    });
  });

// 검색 기능 : https://www.youtube.com/watch?v=ZFUOC-y4i0s

const search = () => {
  const searchbox = document.getElementById('search-input').value.toUpperCase();
  const movieitems = document.getElementById('movie-list');
  const product = document.querySelectorAll('.movie-info');
  const movieTitle = movieitems.getElementsByTagName('h3');

  for (let i = 0; i < movieTitle.length; i++) {
    let match = product[i].getElementsByTagName('h3')[0];

    if (match) {
      let textvalue = match.textContent || match.innerHTML;

      if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
        product[i].style.display = '';
      } else {
        product[i].style.display = 'none';
      }
    }
  }
};

function enterkey() {
  if (window.event.keyCode == 13) {
    search();
  }
}
