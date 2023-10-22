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
  const [ isChecked, setIsChecked ] = useState('');

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isFound, setIsFound ] = useState(true); 

  const [ isMore, setIsMore ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState('');

  function handleMovieSearch() {
    const found = filterMovies(movies, searchText, isChecked);
    if(found.length > 0) {
      setMoviesFound(found);
      setIsFound(true);
      localStorage.setItem('movies', JSON.stringify(found));
      localStorage.setItem('searchText', JSON.stringify(searchText));
      localStorage.setItem('isChecked', JSON.stringify(isChecked));
      const moviesToDisplay = getMoviesToDisplay(found, moviesDisplayed);
      setMoviesDisplayed(moviesToDisplay.movies);
      setIsMore(moviesToDisplay.isMore);
    } else {
      setMoviesFound([]);
      setMoviesDisplayed([]);
      setIsFound(false);
      setErrorMessage(nothingFoundErrorMessage);
    }
  }

  function handleClick() {                                   // Обработчик по клику "Ещё"
    const moviesToDisplay = getMoviesToDisplay(moviesFound, moviesDisplayed);
    setMoviesDisplayed(moviesToDisplay.movies);
    setIsMore(moviesToDisplay.isMore);
  }

  function handleSearchClick() {
    setMoviesFound([]);
    setMoviesDisplayed([]);
    setIsFound(false);
    setIsMore(false);
  }

                                                              
  useEffect(() => {                                          // Загрузка фильмов и поиск при первом валидном поисковом запросе
    if((movies.length === 0) && (searchText.length > 0)) {
      setIsLoading(true);
      moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        setIsLoading(false);
        handleMovieSearch();
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsFound(false);
        setErrorMessage(serverErrorMessage);
      });
    }
  }, [movies])

  useEffect(() => {                                         // Поиск фильмов        
    if(movies.length > 0) {
      handleMovieSearch();
    }
  }, [movies, searchText, isChecked])

  useEffect(() => {                                         // Проверка localStorage 
    const checkLocalStorage = () => {
      const movies = JSON.parse(localStorage.getItem('movies'));
      const searchText = JSON.parse(localStorage.getItem('searchText'));
      const isChecked = JSON.parse(localStorage.getItem('isChecked'));
      if (movies) {
        setMoviesFound(movies);
        setIsFound(true);
        setSearchText(searchText);
        setIsChecked(isChecked);
        const moviesToDisplay = getMoviesToDisplay(movies, moviesDisplayed);
        setMoviesDisplayed(moviesToDisplay.movies);
        setIsMore(moviesToDisplay.isMore);
      }
    } 
    checkLocalStorage();
  }, [])



  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm onSearch={ handleSearchClick } setSearchText={ setSearchText } setIsChecked = { setIsChecked } />
        { isLoading ? <Preloader /> : <MoviesCardList cards={ moviesDisplayed }/> }
        { isFound ? null : <span className="text movies__error">{errorMessage}</span>  }
        { isMore ? <MoviesMore onClick={ handleClick }  /> : null }
      </div>
    </main>
  )
} 