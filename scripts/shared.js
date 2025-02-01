let watchlist = JSON.parse( localStorage.getItem('watchlist') ) || [];
let isWhitemode = JSON.parse( localStorage.getItem('isWhitemode') ) || false;

const colorModeEl = document.getElementById('color-mode');
colorModeEl.addEventListener('click', toggleColorMode);

init();

function init() {
  applyColorMode();
  updateColorModeIcon();
}

function toggleColorMode() {
  isWhitemode = !isWhitemode;
  localStorage.setItem('isWhitemode', JSON.stringify(isWhitemode));
  applyColorMode();
  updateColorModeIcon();
}

function applyColorMode() {
  document.documentElement.classList.toggle('white-mode', isWhitemode);
}

function updateColorModeIcon() {
  const iconSVG = isWhitemode ? getMoonIcon() : getSunIcon();
  colorModeEl.innerHTML = iconSVG;
}

function getMoonIcon() {
  return `<svg fill="#ffffff"viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" class="color-mode--dark">
    <path d="M18.44,34.68a18.22,18.22,0,0,1-2.94-.24,18.18,18.18,0,0,1-15-20.86A18.06,18.06,0,0,1,9.59.63,2.42,2.42,0,0,1,12.2.79a2.39,2.39,0,0,1,1,2.41L11.9,3.1l1.23.22A15.66,15.66,0,0,0,23.34,21h0a15.82,15.82,0,0,0,8.47.53A2.44,2.44,0,0,1,34.47,25,18.18,18.18,0,0,1,18.44,34.68ZM10.67,2.89a15.67,15.67,0,0,0-5,22.77A15.66,15.66,0,0,0,32.18,24a18.49,18.49,0,0,1-9.65-.64A18.18,18.18,0,0,1,10.67,2.89Z"></path>
  </svg>`;
}

function getSunIcon() {
  return `<svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" class="color-mode--light">
    <g stroke="primary" stroke-width="1.5" stroke-miterlimit="10">
      <path d="M5 12H1M23 12h-4M7.05 7.05 4.222 4.222M19.778 19.778 16.95 16.95M7.05 16.95l-2.828 2.828M19.778 4.222 16.95 7.05" stroke-linecap="round"></path>
      <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" fill="#605252" fill-opacity=".16"></path>
      <path d="M12 19v4M12 1v4" stroke-linecap="round"></path>
    </g>
  </svg>`;
}

export default function createMovieElement(data, isWatchlistPage = false) {
  let isInWatchlist = watchlist.some(movie => movie.id === data.imdbID);

  const movieEl = document.createElement("article");
  movieEl.classList.add("flex", "al-c", "movie", "primary", "full-width");

  const img = document.createElement("img");
  img.classList.add("movie__poster")
  img.src = data.Poster;
  img.alt = "";

  const detailsDiv = document.createElement("div");
  detailsDiv.classList.add("flex", "movie__details");

  const titleEl = document.createElement("h2");
  titleEl.classList.add("movie__title");
  titleEl.textContent = data.Title;

  const ratingSpan = document.createElement("span");
  ratingSpan.classList.add("movie__rating");

  const starIcon = document.createElement("i");
  starIcon.classList.add("fa-solid", "fa-star", "fa-xs", "movie__rating-icon");
  starIcon.setAttribute("aria-hidden", "true");

  ratingSpan.appendChild(starIcon);
  ratingSpan.appendChild(document.createTextNode(` ${data.imdbRating}`));

  titleEl.appendChild(ratingSpan);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("flex", "al-c", "movie__info");

  const runtimeEl = document.createElement("time");
  runtimeEl.setAttribute("datetime", data.Runtime.replace(/\s+/g, ""));
  runtimeEl.textContent = data.Runtime;

  const genreSpan = document.createElement("span");
  genreSpan.textContent = data.Genre;

  const watchlistDiv = document.createElement("div");
  watchlistDiv.classList.add("flex", "al-c", "watchlist__container", `${!isWatchlistPage && isInWatchlist ? "pointer-disabled" : "pointer"}`);
  watchlistDiv.dataset.movieId = data.imdbID;

  const watchlistIcon = document.createElement("i");
  watchlistIcon.classList.add("fa-solid", "fa-lg", "watchlist__icon");
  
  isWatchlistPage && isInWatchlist ? watchlistIcon.classList.add('fa-circle-minus')
      : isInWatchlist ? watchlistIcon.classList.add('fa-circle-check')
      : watchlistIcon.classList.add('fa-circle-plus')

  watchlistIcon.setAttribute("aria-hidden", "true");

  const watchlistText = document.createElement("span");
  watchlistText.textContent = `${isWatchlistPage ? 'Remove' : 'Watchlist'}`
  watchlistText.classList.add('watchlist__text');

  isWatchlistPage && isInWatchlist ? watchlistText.textContent = 'Remove'
      : isInWatchlist ? watchlistText.textContent = 'Added!'
      : watchlistText.textContent = 'Watchlist'

  watchlistDiv.appendChild(watchlistIcon);
  watchlistDiv.appendChild(watchlistText);

  infoDiv.appendChild(runtimeEl);
  infoDiv.appendChild(genreSpan);
  infoDiv.appendChild(watchlistDiv);

  const descEl = document.createElement("p");
  descEl.classList.add("movie__desc");
  descEl.textContent = data.Plot;

  detailsDiv.appendChild(titleEl);
  detailsDiv.appendChild(infoDiv);
  detailsDiv.appendChild(descEl);

  movieEl.appendChild(img);
  movieEl.appendChild(detailsDiv);
  return movieEl;
}