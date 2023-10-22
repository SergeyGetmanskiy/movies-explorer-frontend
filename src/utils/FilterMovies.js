export default function filterMovies(movies, searchText, isChecked) {
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