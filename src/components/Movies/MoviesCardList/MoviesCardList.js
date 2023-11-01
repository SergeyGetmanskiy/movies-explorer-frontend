import { useLocation } from 'react-router-dom';

import MoviesCard from "../MoviesCard/MoviesCard"

export default function MoviesCardList({ cards, onCardLike, onCardDelete }) {
  const { pathname } = useLocation();
  return (
    <ul className={`cards ${ pathname === "/saved-movies" && "cards_on_saved-movies" }`}>  
      {cards.map((card) => (
        <li key={card.movieId}>
          <MoviesCard card={card} pathname={ pathname } onCardLike={onCardLike} onCardDelete={onCardDelete} />
        </li>
      ))}
    </ul>
  )
} 
