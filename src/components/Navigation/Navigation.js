import ButtonNavigation from '../UI/Buttons/ButtonNavigation/ButtonNavigation';
import ButtonProfile from '../UI/Buttons/ButtonProfile/ButtonProfile';

export default function Navigation({ pathname, onMovies, onSavedMovies, onProfile }) {
  return (
      <section className="navigation">
          <ButtonNavigation className={`navigation__button-navigation ${ pathname === "/movies" && "navigation__button-navigation_active" }`}
           buttonTitle="Фильмы" onClick={ onMovies } />
          <ButtonNavigation className={`navigation__button-navigation ${ pathname === "/saved-movies" && "navigation__button-navigation_active" }`}
           buttonTitle="Сохранённые фильмы" onClick={ onSavedMovies } />
          <ButtonProfile className="navigation__button-profile" pathname={ pathname } onClick={ onProfile } />
      </section>
  )
}  