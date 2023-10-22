export function filterMovies(movies, searchText, isChecked) {
  let result = movies.filter((movie) => movie.nameRU.includes(searchText.toLowerCase()) || movie.nameEN.includes(searchText.toLowerCase()));
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

export function getMoviesToDisplay(moviesTotal, moviesDisplayed) {
  if((moviesTotal.length > 12) && (moviesDisplayed.length === 0)) {
    return { movies: moviesTotal.slice(0, 12),
             isMore: true }
  } else if ((moviesTotal.length > 12) && (moviesDisplayed.length !== 0)) {
      if((moviesTotal.length - (moviesDisplayed.length) <= 3)) {
        return { movies: moviesTotal.slice(0, moviesDisplayed.length + (moviesTotal.length - moviesDisplayed.length)),
                isMore: false } 
      } else {
        return { movies: moviesTotal.slice(0, 3 + moviesDisplayed.length),
                isMore: true } 
      }
  } else {
    return { movies: moviesTotal,
             isMore: false }
  } 
}