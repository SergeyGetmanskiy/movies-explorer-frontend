import SearchForm from "./SearchForm/SearchForm"
import Preloader from "./Preloader/Preloader"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import MoviesMore from "./MoviesMore/MoviesMore"

export default function Movies({ cards,
                                 isLoading,
                                 isFound,
                                 setSearchText,
                                 setIsChecked,
                                 errorMessage }) {                           

  

  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm setSearchText={ setSearchText } setIsChecked = { setIsChecked } />
        { isLoading ? <Preloader /> : <MoviesCardList cards={ cards }/> }
        { isFound ? null : <span className="text movies__error">{errorMessage}</span>  }
        <MoviesMore />
      </div>
    </main>
  )
} 