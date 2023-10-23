import { useState, useEffect } from "react"

import SearchForm from "./SearchForm/SearchForm"
import Preloader from "./Preloader/Preloader"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import MoviesMore from "./MoviesMore/MoviesMore"
import { nothingFoundErrorMessage,
         serverErrorMessage } from '../../utils/constants'; 
import { filterMovies, getMoviesToDisplay } from '../../utils/FilterMovies';
import { moviesApi } from '../../utils/MoviesApi';

export default function Movies() {
  
  const [ movies, setMovies ] = useState([]);
  const [ moviesFound, setMoviesFound ] = useState([]);
  const [ moviesDisplayed, setMoviesDisplayed ] = useState([]);

  const [ searchText, setSearchText ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isFound, setIsFound ] = useState(true); 

  const [ isMore, setIsMore ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState('');

  function handleMovieSearch(movies, searchText, isChecked) {     // Фильтрация фильмов
    const found = filterMovies(movies, searchText, isChecked);
    if(found.length > 0) {
      setMoviesFound(found);
      setIsFound(true);
      localStorage.setItem('movies', JSON.stringify(found));
      displayMovies(found, moviesDisplayed);
    } else {
      setMoviesFound([]);
      setMoviesDisplayed([]);
      setIsFound(false);
      setErrorMessage(nothingFoundErrorMessage);
    }
  }

  function displayMovies(found, displayed) {                    // Вывод фильмов в блок результатов
    const moviesToDisplay = getMoviesToDisplay(found, displayed);
    setMoviesDisplayed(moviesToDisplay.movies);
    setIsMore(moviesToDisplay.isMore);
  }

 
  function handleSearchClick(query) {                        // Обработчик по клику "Поиск"
    setSearchText(query);
    localStorage.setItem('searchText', JSON.stringify(query));
    if(movies.length === 0) {                       
      setIsLoading(true);
      moviesApi.getMovies()                                  // Загрузка фильмов и поиск при первом валидном поисковом запросе
      .then((movies) => {
        setIsLoading(false);
        console.log(query, movies);
        setMovies(movies);
        handleMovieSearch(movies, query, isChecked);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsFound(false);
        setErrorMessage(serverErrorMessage);
      });
    } else {
      handleMovieSearch(movies, query, isChecked);
    }
  }

  function handleCheckBoxClick(checked) {                     // Обработчик по клику чекбокса
    setIsChecked(checked);
    localStorage.setItem('isChecked', JSON.stringify(checked));
    const found = filterMovies(moviesFound, searchText, checked);
    displayMovies(found, moviesDisplayed);
  }

  function handleMoreMoviesClick() {                         // Обработчик по клику "Ещё"
    displayMovies(moviesFound, moviesDisplayed);
  }

  useEffect(() => {                                         // Проверка localStorage 
    const checkLocalStorage = () => {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const searchText = JSON.parse(localStorage.getItem('searchText'));
      const isChecked = JSON.parse(localStorage.getItem('isChecked'));
      if (movies) {
        setIsFound(true);
        setMoviesFound(movies);
        setSearchText(searchText);
        setIsChecked(isChecked);
        displayMovies(movies, [])
      }
    } 
    checkLocalStorage();
  }, [])

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm onSearch={ handleSearchClick } onCheckbox = { handleCheckBoxClick } />
        { isLoading ? <Preloader /> : <MoviesCardList cards={ moviesDisplayed }/> }
        { isFound ? null : <span className="text movies__error">{errorMessage}</span>  }
        { isMore ? <MoviesMore onClick={ handleMoreMoviesClick }  /> : null }
      </div>
    </main>
  )
} 