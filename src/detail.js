const CURRENT_URL = window.location.href;
const CURRENT_ID = CURRENT_URL.match(/id=(\d+)/)?.[1];

const IMG_URL = `https://image.tmdb.org/t/p/w400/`;

// playMovieTrailer - 가져온 영화 관련 영상들 중 Trailer 영상을 찾아서 페이지에 구현
const playMovieTrailer = async () => {
  const videos = await getMovieVideos();

  const findTrailerVideo = videos.results.find(
    (video) => video.type === "Trailer",
  );
  const YOUTUBE_KEY = findTrailerVideo.key;

  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = `<iframe  frameborder="0" allowfullscreen="1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" title="${document.title}" width="100%" height="100%" src="https://www.youtube.com/embed/${YOUTUBE_KEY}?autoplay=1&amp;mute=1&amp;controls=1&amp;origin=https%3A%2F%2Fnomadcoders.co&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;iv_load_policy=3&amp;modestbranding=1&amp;cc_lang_pref=ko&amp;cc_load_policy=1&amp;enablejsapi=1&amp;widgetid=1" id="widget2"></iframe>`;
};

const showMovieDetails = async () => {
  const detail = await getMovieDetails();
  const credits = await getMovieCredits();

  document.title = detail.title;

  const genres = detail.genres.map(genres => genres.name);
  const director = credits.crew.find(person => person.job === "Director");
  const casting = credits.cast.slice(0, 4).map(person => person.name);

  const detailsContainer = document.querySelector("#details-container");
  const currentMoviePoster = detailsContainer.querySelector(
    "#current-movie-poster",
  );
  const currentMovieTitle = detailsContainer.querySelector(
    "#current-movie-title",
  );
  const currentMovieGenre = detailsContainer.querySelector(
    "#current-movie-genre",
  );
  const currentMovieDirector = detailsContainer.querySelector("#director");
  const currentMovieCasting = detailsContainer.querySelector("#casting");
  const currentMovieOverView = detailsContainer.querySelector(
    "#current-movie-overview",
  );

  currentMoviePoster.innerHTML = `<img src="${IMG_URL}${detail.poster_path}" alt="Movie Poster">`;
  currentMovieTitle.innerHTML = `${detail.title}`;
  currentMovieGenre.innerHTML = `장르: ${genres.join(", ")}`;
  currentMovieDirector.innerHTML = `감독: ${director.name}`;
  currentMovieCasting.innerHTML = `출연: ${casting.join(", ")}`;
  currentMovieOverView.innerHTML = `${detail.overview}`;
};

// API 데이터 GET
// 1. getMovieDetails - 영화 상세정보(장르, 제목 등)
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

// 2. getMovieCredits - 영화 크레딧 정보(출연 배우, 감독 등)
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

// 3. GetMovieVideos - 영화 관련 유튜브 영상
const getMovieVideos = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic",
    },
  };

  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${CURRENT_ID}/videos?language=en-US`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
  return data;
};

const init = () => {
  showMovieDetails();
  playMovieTrailer();
};
init();
