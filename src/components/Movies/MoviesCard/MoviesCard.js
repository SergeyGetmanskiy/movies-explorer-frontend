import { useContext } from "react";

import ButtonLike from "../../UI/Buttons/ButtonLike/ButtonLike";
import ButtonDelete from "../../UI/Buttons/ButtonDelete/ButtonDelete";

import { CurrentUserContext } from "../../../context/CurrentUserContext";

export default function MoviesCard({ card, pathname, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);
  
  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration % 60;

  const isLiked = card.likes.some(i => i === currentUser._id);

  function handleLikeClick(e) {
    e.preventDefault();
    onCardLike(card);
  }

  function handleCardDelete(e) {
    e.preventDefault();
    onCardDelete(card._id, card.movieId);
  }

  function handleCardClick(e) {
    e.preventDefault();
    window.open(card.trailerLink, '_blank');
  }

  return (
    <div className="card">
      <div className="card__top">
        <img className="card__image" src={ card.image } alt="foto" onClick={ handleCardClick }/>
      </div>
      <div className="card__bottom">
        <h2 className="text card__title">{ card.nameRU }</h2>
        { pathname === "/movies" && <ButtonLike className="card__like" isLiked={isLiked} onCardLike={ handleLikeClick } /> }
        { pathname === "/saved-movies" && <ButtonDelete className="card__delete-button" onCardDelete={ handleCardDelete } /> }
        <output className="card__duration">{ `${ hours }ч ${ minutes }м` }</output>
      </div>
    </div>
  )
}