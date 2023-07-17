const apiKey = 'api_key=55205e8d8334438258cda3e19007de7c';
const baseURL = 'https://api.themoviedb.org/3';
const imgURL = 'https://image.tmdb.org/t/p/w500';
const searchUrl = baseURL + '/search/movie?' + apiKey;

function getMovies(url) {
  return fetch(url)
    .then((movies) => movies.json())
    .then((data) => data.results)
    .catch((err) => {
      console.log('Error in fetching movies:', err);
      return [];
    });
}

function showMovies(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  data.forEach((movie) => {
    const { title, poster_path, vote_average } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('moviedata');
    movieEl.innerHTML = `
        <img src="${imgURL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <p>Avrage Rating: <b>${vote_average}</b></p>
        </div>
        `;
    container.append(movieEl);
  });
}

function fetchMoviesBasedOnCategory() {
  const pathname = window.location.pathname;

  if (pathname.endsWith('index.html')) {
    const homeUrl = baseURL + '/discover/movie?' + apiKey;
    getMovies(homeUrl)
      .then((movies) => showMovies(movies, 'homepagemovies'))
      .catch((err) => {
        console.log('Error in fetching movies:', err);
      });
  } else if (pathname.endsWith('trending.html')) {
    const trendingUrl = baseURL + '/trending/movie/day?' + apiKey;
    getMovies(trendingUrl)
      .then((movies) => showMovies(movies, 'trendingmovies'))
      .catch((err) => {
        console.log('Error in fetching movies:', err);
      });
  } else if (pathname.endsWith('nowPlaying.html')) {
    const nowPlayingUrl = baseURL + '/movie/now_playing?' + apiKey;
    getMovies(nowPlayingUrl)
      .then((movies) => showMovies(movies, 'nowplayingmovies'))
      .catch((err) => {
        console.log('Error in fetching movies:', err);
      });
  } else if (pathname.endsWith('topRated.html')) {
    const topRatedUrl = baseURL + '/movie/top_rated?' + apiKey;
    getMovies(topRatedUrl)
      .then((movies) => showMovies(movies, 'topratedmovies'))
      .catch((err) => {
        console.log('Error in fetching movies:', err);
      });
  } else if (pathname.endsWith('popular.html')) {
    const popularUrl = baseURL + '/movie/popular?' + apiKey;
    getMovies(popularUrl)
      .then((movies) => showMovies(movies, 'popularmovies'))
      .catch((err) => {
        console.log('Error in fetching movies:', err);
      });
  } else if (pathname.endsWith('upcoming.html')) {
    const upcomingUrl = baseURL + '/movie/upcoming?' + apiKey;
    getMovies(upcomingUrl)
      .then((movies) => showMovies(movies, 'upcomingmovies'))
      .catch((err) => {
        console.log('Error in fetching movies:', err);
      });
  }

}

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const searchTerm = document.getElementById('searchInput').value.trim();

  if (searchTerm !== '') {
    const searchingUrl = searchUrl + '&query=' + searchTerm;
    getMovies(searchingUrl)
      .then((movies) => showMovies(movies, 'searchedmovies'))
      .catch((err) => {
        console.log('Error in fetching movies:', err);
      });
  } else {
    window.location.reload()
  }
});

function init() {
  fetchMoviesBasedOnCategory();
}

window.addEventListener('load', init);
