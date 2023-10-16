import ButtonNavigation from '../UI/Buttons/ButtonNavigation/ButtonNavigation';
import ButtonProfile from '../UI/Buttons/ButtonProfile/ButtonProfile';
import ButtonClose from '../UI/Buttons/ButtonClose/ButtonClose';

export default function NavigationPopup({ pathname, onMovies, onSavedMovies, onProfile, onLogo, setIsPopupOpen}) {

  function handleClickMain() {
    onLogo();
    handleClosePopup();
  }

  function handleClickMovies() {
    onMovies();
    handleClosePopup();
  }

  function handleClickSavedMovies() {
    onSavedMovies();
    handleClosePopup();
  }

  function handleClickProfile() {
    onProfile();
    handleClosePopup();
  }

  function handleClosePopup() {
    setIsPopupOpen(false);
  }

  return (
    <section className="navigation-popup">
      <ul className="navigation-popup__container">
        <li className="navigation-popup__links">
          <ButtonNavigation
            className={`navigation-popup__link ${ pathname === "/" && "navigation-popup__link_active" }`}
            buttonTitle="Главная" 
            onClick={ handleClickMain }
          />
        </li>
        <li className="navigation-popup__links">
          <ButtonNavigation
            className={`navigation-popup__link ${ pathname === "/movies" && "navigation-popup__link_active" }`}
            buttonTitle="Фильмы" 
            onClick={ handleClickMovies } 
          />
        </li>
        <li className="navigation-popup__links">
          <ButtonNavigation 
            className={`navigation-popup__link ${ pathname === "/saved-movies" && "navigation-popup__link_active" }`}
            buttonTitle="Сохранённые фильмы" 
            onClick={ handleClickSavedMovies } 
          />
        </li>
        <li className="navigation-popup__links">
          <ButtonProfile 
              className="navigation-popup__button-profile" 
              pathname={ pathname } 
              onClick={ handleClickProfile }
          />
        </li>  
      </ul>  
      <ButtonClose
          className="navigation-popup__button-close"
          pathname={pathname}
          onClick={handleClosePopup} 
      />
    </section>
  )
}
