import { useLocation } from 'react-router-dom';

import MoviesCard from "../MoviesCard/MoviesCard"

export default function MoviesCardList({ cards }) {
  const { pathname } = useLocation();
  return (
    <ul className={`cards ${ pathname === "/saved-movies" && "cards_on_saved-movies" }`}>  
      {cards.map((card) => (
        <li key={card._id}>
          <MoviesCard card={card} pathname={ pathname } />
        </li>
      ))}
    </ul>
  )
} 
