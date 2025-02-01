import createMovieElement from "./shared.js";

document.addEventListener('DOMContentLoaded', async () => {
  const API_KEY = await getApiKey();
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

  const moviesContainer = document.getElementById('movies');
  const moviePlaceholder = document.getElementById('movie-placeholder');
  const movieInput = document.getElementById('movie-input');
  const searchForm = document.getElementById('search-form');

  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  let movies = [];

  const lastSearch = sessionStorage.getItem('lastSearch');
  if (lastSearch) {
    movieInput.value = lastSearch;
    handleSearchSubmit(new Event('submit'));
  }

  searchForm.addEventListener('submit', handleSearchSubmit);
  moviesContainer.addEventListener('click', handleWatchlistClick);

  async function getApiKey() {
    const response = await fetch("../config.json");
    const config = await response.json();
    return config.omdbApiKey;
  }

  async function handleSearchSubmit(e) {
    e.preventDefault();

    const filmTitle = movieInput.value.trim();
    if (!filmTitle) {
      alert("Please enter a valid movie!");
      e.target.reset();
      return;
    }

    const response = await fetch(`${API_URL}&s=${filmTitle}`);
    const data = await response.json();

    if (!data.Search) {
      displayNoMoviesFound();
      e.target.reset();
      sessionStorage.removeItem('lastSearch');
      return;
    }

    const topMovies = data.Search.slice(0, 5);
    moviesContainer.innerHTML = '';
    moviesContainer.classList.remove('jc-c');

    const moviesData = await Promise.all(
      topMovies.map(movie => fetch(`${API_URL}&i=${movie.imdbID}`).then(res => res.json()))
    );

    const fragment = document.createDocumentFragment();
    moviesData.forEach(movieData => {
      const movieEl = createMovieElement(movieData);
      fragment.appendChild(movieEl);
      movies.push({ id: movieData.imdbID, data: movieData });
    });

    moviesContainer.appendChild(fragment);
    sessionStorage.setItem('lastSearch', filmTitle);
  }

  function displayNoMoviesFound() {
    moviesContainer.innerHTML = '';
    moviePlaceholder.textContent = 'Unable to find what you’re looking for. Please try another search.';
    moviePlaceholder.style.color = '#787878';
    moviesContainer.appendChild(moviePlaceholder);
    moviesContainer.classList.add('jc-c');
  }

  function handleWatchlistClick(e) {
    const watchlistEl = e.target.closest('.watchlist__container');
    if (watchlistEl) {
      toggleWatchlist(watchlistEl);
    } 
  }

  function toggleWatchlist(watchlistEl) {
    const movieId = watchlistEl.dataset.movieId;
    if (!movieId) return;

    const movie = movies.find(movie => movie.id === movieId);
    const isAlreadyInWatchlist = watchlist.some(watchlistMovie => watchlistMovie.id === movieId);

    if (!isAlreadyInWatchlist) {
      watchlist.push(movie);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }

    updateWatchlistUI(watchlistEl);
  }

  function updateWatchlistUI(watchlistEl) {
    const watchlistText = watchlistEl.querySelector('.watchlist__text');
    const watchlistIcon = watchlistEl.querySelector('.watchlist__icon');

    if (watchlistText) {
      watchlistText.textContent = 'Added!';
    }

    if (watchlistIcon) {
      watchlistIcon.classList.remove('fa-circle-plus');
      watchlistIcon.classList.add('fa-circle-check');
    }
  }
});
