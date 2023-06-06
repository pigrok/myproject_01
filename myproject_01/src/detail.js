import { fetchMovieData } from "./movie.js";

const getMo = async () => {
    const movies = await fetchMovieData();
    console.log(movies); // movies 배열 출력 또는 원하는 작업 수행
};

const getIdFromUrl = () => {
    const url = window.location.href;
    const id = url.match(/id=(\d{6})/)?.[1];
    console.log(id);
};

const init = () => {
    getMo();
    getIdFromUrl();
};

init();