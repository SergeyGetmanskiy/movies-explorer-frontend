import SearchForm from "../Movies/SearchForm/SearchForm"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"

export default function SavedMovies({ cards, isLoading }) {
  return (
    <div className="movies">
      <div className="movies__container">
        <SearchForm />
        <MoviesCardList cards={ cards }/>
      </div>
    </div>
  )
}
