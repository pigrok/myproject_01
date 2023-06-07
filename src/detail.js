const CURRENT_URL = window.location.href;
const CURRENT_ID = CURRENT_URL.match(/id=(\d+)/)?.[1];
console.log(CURRENT_ID);
const IMG_URL = `https://image.tmdb.org/t/p/w500/`

const showMovieDetails = async () => {
  const detail = await getMovieDetails();
  const credits = await getMovieCredits();

  document.title = detail.title;

  const director = credits.crew.find((person) => person.job === "Director");
  const casting = credits.cast.slice(0, 4).map((person) => person.name);

  const currentMoviePoster = document.querySelector("#current-movie-poster");
  const currentMovieTitle = document.querySelector("#current-movie-title");
  const currentMovieDirector = document.querySelector("#director");
  const currentMovieCasting = document.querySelector("#casting");

  currentMoviePoster.innerHTML = `<img src="${IMG_URL}${detail.poster_path}" alt="Movie Poster">`;
  currentMovieTitle.innerText = detail.title;
  currentMovieDirector.innerText = director.name;
  currentMovieCasting.innerText = casting.join(", ");
};


const getMovieDetails = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic",
    },
  };

  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${CURRENT_ID}?language=ko-KO`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
  return data;
};

const getMovieCredits = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic",
    },
  };

  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${CURRENT_ID}/credits?language=ko-KO`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
  return data;
}

const getMovieVideos = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic'
    }
  };
  
  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${CURRENT_ID}/videos?language=ko-KO`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
  return data
}

const init = () => {
  getMovieVideos();
  showMovieDetails();
}
init();
