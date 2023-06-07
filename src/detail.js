const CURRENT_URL = window.location.href;
const CURRENT_ID = CURRENT_URL.match(/id=(\d+)/)?.[1];
const IMG_URL = `https://image.tmdb.org/t/p/w500/`;



const showMovieDetails = async () => {
  const detail = await getMovieDetails();
  const credits = await getMovieCredits();

  document.title = detail.title;

  const director = credits.crew.find(person => person.job === "Director");
  const casting = credits.cast.slice(0, 4).map(person => person.name);

  const currentMoviePoster = document.querySelector("#current-movie-poster");
  const currentMovieTitle = document.querySelector("#current-movie-title");
  const currentMovieDirector = document.querySelector("#director");
  const currentMovieCasting = document.querySelector("#casting");

  const movieTrailer = document.querySelector("#movie-trailer");
  const movieId =
    (currentMoviePoster.innerHTML = `<img src="${IMG_URL}${detail.poster_path}" alt="Movie Poster">`);
  currentMovieTitle.innerText = detail.title;
  currentMovieDirector.innerText = director.name;
  currentMovieCasting.innerText = casting.join(", ");

  // movieTrailer.innerHTML = (
  //   <iframe
  //     frameborder="0"
  //     allowfullscreen="1"
  //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //     title="6 1 Adding ToDos"
  //     width="100%"
  //     height="100%"
  //     src="https://www.youtube.com/embed/${gkrjJIkd6eM}?autoplay=0&amp;mute=0&amp;controls=1&amp;origin=https%3A%2F%2Fnomadcoders.co&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;cc_lang_pref=ko&amp;cc_load_policy=1&amp;enablejsapi=1&amp;widgetid=1"
  //     id="widget2"
  //   ></iframe>
  // );
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
};

const getMovieVideos = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic",
    },
  };

  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${CURRENT_ID}/videos?language=ko-KO`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
  return data;
};

const init = () => {
  getMovieVideos();
  showMovieDetails();
};
init();


