import SearchForm from "./SearchForm/SearchForm"
import Preloader from "./Preloader/Preloader"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import MoviesMore from "./MoviesMore/MoviesMore"

export default function Movies({ cards,
                                 isLoading,
                                 isFound,
                                 setQuery }) {                           

  const nothingFoundErrorMessage = "Ничего не найдено";
  const serverErrorMessage = "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
  
  console.log(isFound);

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm setQuery={ setQuery } />
        { isLoading ? <Preloader /> : <MoviesCardList cards={ cards }/> }
        { isFound ? null : <span className="text movies__error">{nothingFoundErrorMessage}</span>  }
        <MoviesMore />
      </div>
    </main>
  )
} 