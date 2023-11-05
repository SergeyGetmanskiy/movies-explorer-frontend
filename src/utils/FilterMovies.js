export function filterMovies(movies, searchText, isChecked) {
  let result = movies.filter(
  (movie) => movie.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
  movie.nameEN.toLowerCase().includes(searchText.toLowerCase())
  );
  if(result.length > 0) {
    if(isChecked) {
      result = result.filter((movie) => movie.duration <= 40);
      if(result.length > 0) {
        return result
      } 
      return []
    }
    return result
  } else {
    return []
  };
}

export function checkLikes(moviesTotal, moviesSaved, currentUserId) {
  if(moviesSaved.length === 0) {
    return moviesTotal
  } else {
    const moviesSavedIds = moviesSaved.map(movie => movie.movieId);
    const moviesToReturn = moviesTotal.map((movie) => {
      const isLiked = moviesSavedIds.includes(movie.movieId);
      if(isLiked) {
        return { ...movie, likes: [ currentUserId  ] }
      }
      return movie
    })
    return moviesToReturn
  }
}

export function getMoviesToDisplay(moviesTotal, moviesDisplayed, width) {
  let requiredLength;
  let cardsInARow;
  if(width >= 1280) {
    requiredLength = 12;
    cardsInARow = 3;
  } else if(width < 1280 && width >=768) {
    requiredLength = 8;
    cardsInARow = 2;
  } else if(width < 768) {
    requiredLength = 5;
    cardsInARow = 2;
  }
  if((moviesTotal.length > requiredLength) && (moviesDisplayed.length === 0)) {
    return {
      movies: moviesTotal.slice(0, requiredLength),
      isMore: true,
    }
  } else if ((moviesTotal.length > requiredLength) && (moviesDisplayed.length !== 0)) {
      if((moviesTotal.length - moviesDisplayed.length) <= cardsInARow) {
        return {
          movies: moviesTotal.slice(0, moviesDisplayed.length + (moviesTotal.length - moviesDisplayed.length)),
          isMore: false,
        } 
      } else {
        return {
          movies: moviesTotal.slice(0, cardsInARow + moviesDisplayed.length),
          isMore: true,
        } 
      }
  } else {
    return {
      movies: moviesTotal,
      isMore: false,
    }
  } 
}