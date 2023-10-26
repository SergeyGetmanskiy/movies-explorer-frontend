import { useState, useEffect } from "react";

import { mainApi } from "../../utils/MainApi";
import SearchForm from "../Movies/SearchForm/SearchForm"
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList"

export default function SavedMovies({ onCardDelete, savedMovies, setSavedMovies }) {
console.log(savedMovies);
  return (
    <main className="movies">
      <div className="movies__container">
        <SearchForm />
        <MoviesCardList cards={ savedMovies } onCardDelete={ onCardDelete }/>
        <div className="movies__devider" />
      </div>
    </main>
  )
}
