import { useState, useEffect } from "react";

import SearchForm from "../Movies/SearchForm/SearchForm"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"
import { NOTHING_FOUND_ERROR_MESSAGE } from '../../utils/constants'; 
import { filterMovies, getMoviesToDisplay } from '../../utils/FilterMovies';

export default function SavedMovies({ width, onCardDelete, savedMovies }) {

  const [ savedMoviesFound, setSavedMoviesFound ] = useState([]);
  const [ moviesDisplayed, setMoviesDisplayed ] = useState([]);

  const [ searchText, setSearchText ] = useState('');
  const [ isChecked, setIsChecked ] = useState(false);

  const [ isFound, setIsFound ] = useState(true); 

  const errorMessage = NOTHING_FOUND_ERROR_MESSAGE;

  function handleMovieSearch(movies, searchText) {     // Фильтрация фильмов
    const found = filterMovies(movies, searchText, isChecked);
    if(found.length > 0) {
      console.log(found);
      setSavedMoviesFound(found);
      setIsFound(true);
      displayMovies(found, []);
    } else {
      setSavedMoviesFound([]);
      setMoviesDisplayed([]);
      setIsFound(false);
    }
  }

  function displayMovies(found, displayed) {                    // Вывод фильмов в блок результатов
    const moviesToDisplay = getMoviesToDisplay(found, displayed, width);
    setMoviesDisplayed(moviesToDisplay.movies);
    if(moviesToDisplay.movies.length > 0) {
      setIsFound(true);
    } else {
      setIsFound(false);
    }
  }
 
  function handleSearchClick(query) {                        // Обработчик по клику "Поиск"
    setSearchText(query);
    handleMovieSearch(savedMovies, query);
  }

  function handleCheckBoxClick(checked) {                     // Обработчик по клику чекбокса
    setIsChecked(checked);
    const found = filterMovies(savedMoviesFound, searchText, checked);
    if(found.length === 0) {
      setIsFound(false);
    } else {
      setIsFound(true);
    }
    displayMovies(found, []);
  }

  useEffect(() => {                                         // Вывод сохраненных фильмов в блок результатов 
    setSavedMoviesFound(savedMovies);
    displayMovies(savedMovies, [])
  }, [savedMovies])

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm onSearch={ handleSearchClick } onCheckbox = { handleCheckBoxClick } isChecked={ isChecked }  />
        <MoviesCardList cards={ moviesDisplayed } onCardDelete={ onCardDelete }/>
        { isFound ? null : <span className="text movies__error">{errorMessage}</span>  }
        <div className="movies__devider" />
      </div>
    </main>
  )
}
