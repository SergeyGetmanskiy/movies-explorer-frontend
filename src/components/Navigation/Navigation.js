import ButtonNavigation from '../UI/Buttons/ButtonNavigation/ButtonNavigation';
import ButtonProfile from '../UI/Buttons/ButtonProfile/ButtonProfile';

export default function Navigation({ onFilms, onSavedFilms, onProfile }) {
  return (
      <section className="navigation">
          <ButtonNavigation className="navigation__button-navigation" buttonTitle="Фильмы" onClick={ onFilms } />
          <ButtonNavigation className="navigation__button-navigation" buttonTitle="Сохранённые фильмы" onClick={ onSavedFilms } />
          <ButtonProfile className="navigation__button-profile" onClick={ onProfile } />
      </section>
  )
} 