import React from "react";
import cardImage  from '../../../images/card_image.jpg'
import ButtonLike from "../../UI/Buttons/ButtonLike/ButtonLike";
import ButtonDelete from "../../UI/Buttons/ButtonDelete/ButtonDelete";

export default function MoviesCard({ card, pathname }) {

  const isOwn = true;
  const isLiked = true;

  return (
    <div className="card">
      <div className="card__top">
        <img className="card__image"
              src={ cardImage }
              alt="foto"
        />
      </div>
      <div className="card__bottom">
        <h2 className="text card__title">{ card.title }</h2>
        { pathname === "/movies" && <ButtonLike className="card__like" isLiked={isLiked} /> }
        { pathname === "/saved-movies" && <ButtonDelete className="card__delete-button" /> }
        <output className="card__duration" id="duration">{ card.duration }</output>
      </div>
    </div>
  )
}