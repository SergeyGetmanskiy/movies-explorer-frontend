import { useState } from "react";

import ButtonLike from "../../UI/Buttons/ButtonLike/ButtonLike";
import ButtonDelete from "../../UI/Buttons/ButtonDelete/ButtonDelete";

export default function MoviesCard({ card, pathname, onCardLike }) {
  
  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration % 60;
  const isOwn = true;
  const [ isLiked, setIsLiked ] = useState(false);

  function handleLikeClick() {
    onCardLike(card);
    setIsLiked(true);
  }

  return (
    <div className="card">
      <div className="card__top">
        <img className="card__image"
              src={ `https://api.nomoreparties.co/${card.image.url}`}
              alt="foto"
        />
      </div>
      <div className="card__bottom">
        <h2 className="text card__title">{ card.nameRU }</h2>
        { pathname === "/movies" && <ButtonLike className="card__like" isLiked={isLiked} onCardLike={ handleLikeClick } /> }
        { pathname === "/saved-movies" && <ButtonDelete className="card__delete-button" /> }
        <output className="card__duration">{ `${ hours }ч ${ minutes }м` }</output>
      </div>
    </div>
  )
}