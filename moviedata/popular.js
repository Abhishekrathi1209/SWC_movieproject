const apiKey = 'api_key=55205e8d8334438258cda3e19007de7c';
const baseURL = 'https://api.themoviedb.org/3';
const popularUrl = baseURL + '/movie/popular?' + apiKey;
const imgURL = 'https://image.tmdb.org/t/p/w500';
const searchUrl = baseURL + '/search/movie?' + apiKey;


const popular  = document.getElementById('popularmovies');


getMovies(popularUrl);

function getMovies(url){
    let movies = fetch(url)
    movies.then(res=>res.json()).then(data=>{
        console.log(data)
        showMovies(data.results)
    })
}

function showMovies(data){
    popular.innerHTML = ''

    data.forEach(movie => {
        const {title, poster_path, vote_average} = movie
        const movieEl = document.createElement('div')
        movieEl.classList.add('moviedata');
        movieEl.innerHTML = `
        <img src = "${imgURL+poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <p>Avrage Rating: <b>${vote_average}</b></p>
        </div>
        `
        popular.append(movieEl);
    });
}


const searchForm = document.querySelector('form')

searchForm.addEventListener('submit', e => {
    e.preventDefault()

    const searchTerm = document.getElementById('searchInput').value.trim();

    if(searchTerm !== ''){
        const searchingurl = searchUrl + '&query=' + searchTerm
        getMovies(searchingurl);
    } else{
        window.location.reload()
    }
})