import { useState, useEffect, useContext } from "react"

import { CurrentUserContext } from "../../context/CurrentUserContext"
import SearchForm from "./SearchForm/SearchForm"
import Preloader from "./Preloader/Preloader"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import MoviesMore from "./MoviesMore/MoviesMore"
import { NOTHING_FOUND_ERROR_MESSAGE,
         SERVER_ERROR_MESSAGE } from '../../utils/constants'; 
import { filterMovies, checkLikes, getMoviesToDisplay } from '../../utils/FilterMovies';
import { moviesApi } from '../../utils/MoviesApi';

export default function Movies({ width, onCardLike, moviesFound, setMoviesFound, savedMovies }) {

  const currentUser = useContext(CurrentUserContext);
  
  const [ movies, setMovies ] = useState([]);

  const [ moviesDisplayed, setMoviesDisplayed ] = useState([]);

  const [ searchText, setSearchText ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isFound, setIsFound ] = useState(true); 

  const [ isMore, setIsMore ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState('');

  function handleMovieSearch(movies, searchText) {            // Фильтрация фильмов
    const found = filterMovies(movies, searchText, isChecked);
    if(found.length > 0) {
      setMoviesFound(found);
      setIsFound(true);
      localStorage.setItem('movies', JSON.stringify(found));
      displayMovies(found, []);
    } else {
      setMoviesFound([]);
      setMoviesDisplayed([]);
      setIsFound(false);
      setErrorMessage(NOTHING_FOUND_ERROR_MESSAGE);
    }
  }

  function displayMovies(found, displayed) {                  // Вывод фильмов в блок результатов
    const moviesCheckedForLikes = checkLikes(found, savedMovies, currentUser._id);
    const moviesToDisplay = getMoviesToDisplay(moviesCheckedForLikes, displayed, width);
    setMoviesDisplayed(moviesToDisplay.movies);
    setIsMore(moviesToDisplay.isMore);
    if(moviesToDisplay.movies.length > 0) {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
  }
 
  function handleSearchClick(query) {                        // Обработчик по клику "Поиск"
    setSearchText(query);
    localStorage.setItem('searchText', JSON.stringify(query));
    if(movies.length === 0) {                       
      setIsLoading(true);
      moviesApi.getMovies()                                  // Загрузка фильмов и поиск при первом валидном поисковом запросе
      .then((movies) => {
        setIsLoading(false);
        const downloadedMovies = movies.map((movie) => { return {
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `https://api.nomoreparties.co${movie.image.url}`,
          trailerLink: movie.trailerLink,
          thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          likes: [], 
        }});
        setMovies(downloadedMovies);
        handleMovieSearch(downloadedMovies, query);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsFound(false);
        setErrorMessage(SERVER_ERROR_MESSAGE);
      });
    } else {
      handleMovieSearch(movies, query);
    }
  }

  function handleCheckBoxClick(checked) {                     // Обработчик по клику чекбокса
    setIsChecked(checked);
    localStorage.setItem('isChecked', JSON.stringify(checked));
    const found = filterMovies(moviesFound, searchText, checked);
    if(found.length === 0) {
      setIsFound(false);
    } else {
      setIsFound(true);
    }
    displayMovies(found, moviesDisplayed);
  }

  function handleMoreMoviesClick() {                         // Обработчик по клику "Ещё"
    displayMovies(moviesFound, moviesDisplayed);
  }

  useEffect(() => {                                         // Проверка localStorage 
    const checkLocalStorage = () => {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const text = JSON.parse(localStorage.getItem('searchText'));
      const checked = JSON.parse(localStorage.getItem('isChecked'));
      if (movies) {
        const found = filterMovies(movies, text, checked);
        displayMovies(found, moviesDisplayed)
      }
    } 
    checkLocalStorage();
  }, [])

  useEffect(() => {
    if(isMore) {
      const nextMoviesDisplayed = moviesFound.filter((movie, index) => index < moviesDisplayed.length);
      setMoviesDisplayed(nextMoviesDisplayed);
    }
     else {
      const found = filterMovies(moviesFound, searchText, isChecked);
      displayMovies(found, moviesDisplayed);
    }
  }, [moviesFound]) 

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm onSearch={ handleSearchClick } onCheckbox = { handleCheckBoxClick } isChecked={ isChecked } />
        { isLoading ? <Preloader /> : <MoviesCardList cards={ moviesDisplayed } onCardLike={ onCardLike }/> }
        { isFound ? null : <span className="text movies__error">{errorMessage}</span>  }
        { isMore ? <MoviesMore onClick={ handleMoreMoviesClick }  /> : null }
      </div>
    </main>
  )
} 