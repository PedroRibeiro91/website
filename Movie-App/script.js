const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


const main = document.querySelector("main");
const form = document.querySelector("form");
const search = document.getElementById("search");


// load movies
getMovies(APIURL);


async function getMovies(url) {
    // load the movie info or data
    const loadURL = await fetch(url);
    const movieData = await loadURL.json();

    showMovies(movieData.results);

}

// show movies
function showMovies(movies){
    // clear main
    main.innerHTML = '';
    movies.forEach(movie => {
        // our movie has the following fields, observed from the browser console
        const { poster_path, title, vote_average, overview } = movie;

        const movieELement = document.createElement('div');
        movieELement.classList.add('movie');

        movieELement.innerHTML = `
            <img 
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                ${overview}
            </div>
        `
        //img.src = IMGPATH + movie.poster_path;
        
        main.appendChild(movieELement);
    });

}

// helper function that customizes the score color 
function getClassByRate(vote){

   if (vote >= 9){
       return 'orange';
    } else if (vote >= 7){
        return 'purple';
    } else if (vote >= 5){
        return 'blue';
    } else {
        return 'green';
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const keyword = search.value;

    if(keyword){
        getMovies(SEARCHAPI + keyword);
        search.value='';
    }

})








