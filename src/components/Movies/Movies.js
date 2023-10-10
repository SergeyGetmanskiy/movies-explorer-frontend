import SearchForm from "./SearchForm/SearchForm"
import Preloader from "./Preloader/Preloader"
import MoviesCardList from "./MoviesCardList/MoviesCardList"
import MoviesMore from "./MoviesMore/MoviesMore"

export default function Movies({ cards, isLoading }) {
  return (
    <div className="movies">
      <div className="movies__container">
        <SearchForm />
        { isLoading ? <Preloader /> : <MoviesCardList cards={ cards }/> }
        <MoviesMore />
      </div>
    </div>
  )
} 