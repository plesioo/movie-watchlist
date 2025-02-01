import createMovieElement from "./shared.js";

const moviesContainer = document.getElementById('movies');
let watchlist = JSON.parse( localStorage.getItem('watchlist') ) || [];

init();

function init() {
  moviesContainer.addEventListener('click', handleWatchlistClick);
  renderWatchlist();
}

function handleWatchlistClick(e) {
  const watchlistEl = e.target.closest('.watchlist__container');
  if (watchlistEl) {
    removeFromWatchlist(watchlistEl.dataset.movieId);
  }
}


function renderWatchlist() {
  moviesContainer.innerHTML = '';
  moviesContainer.classList.remove('jc-c');

  if (!watchlist.length) {
    displayPlaceholderMsg();
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const movie of watchlist) {
    const movieEl = createMovieElement(movie.data, true);
    fragment.appendChild(movieEl); 
  }

  moviesContainer.appendChild(fragment);
}

function displayPlaceholderMsg() {
  moviesContainer.classList.add('jc-c');
  moviesContainer.appendChild(createPlaceholderMsg());
}

function createPlaceholderMsg() {
  const fragment = document.createDocumentFragment();

  const span = document.createElement('span');
  span.textContent = 'Your watchlist is looking a little empty...';
  span.classList.add('movies-list__placeholder', 'bold');

  const anchor = document.createElement('a');
  anchor.href = 'index.html';
  anchor.classList.add('flex', 'al-c', 'primary', 'text-dec-none');

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-circle-plus', 'fa-lg', 'pointer');
  icon.setAttribute('aria-hidden', 'true');

  const anchorText = document.createElement('span');
  anchorText.textContent = "Let's add some movies!";
  anchorText.classList.add('bold');

  anchor.appendChild(icon);
  anchor.appendChild(anchorText);

  fragment.appendChild(span);
  fragment.appendChild(anchor);

  return fragment;
}


function removeFromWatchlist(movieId) {
  if (!movieId) return;

  watchlist = watchlist.filter(movie => movie.id !== movieId);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  renderWatchlist();
}