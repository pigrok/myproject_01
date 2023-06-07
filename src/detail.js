const getIdFromUrl = () => {
  const url = window.location.href;
  const id = url.match(/id=(\d{6})/)?.[1];
  console.log(id)
  return id;
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

  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${getIdFromUrl()}?language=ko-KO`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
  return data.results;
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

  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${getIdFromUrl()}/credits?language=ko-KO`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
  return data.results;
}

const getMovieVideos = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NjZmYTE3MGI2YTI5ZTY2NjNhMjBiZWVmMTM0ZGJlNSIsInN1YiI6IjY0NzA4ZmE3NzI2ZmIxMDE0NGU2MTU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WjMDg4jW2jKFKA7ASX32W7RWlkt6KKmrcmF6_Bn_fic'
    }
  };
  
  const API_URL_BY_ID = `https://api.themoviedb.org/3/movie/${getIdFromUrl()}/videos?language=ko-KO`;

  const response = await fetch(API_URL_BY_ID, options);
  const data = await response.json();
  console.log(data);
}

const getThisMovieInfo = () => {
  getMovieDetails();
  getMovieCredits();
  getMovieVideos();
}

getThisMovieInfo();
