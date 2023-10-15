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
        <ButtonNavigation
          className={`navigation-popup__button-navigation ${ pathname === "/" && "navigation-popup__button-navigation_active" }`}
          buttonTitle="Главная" 
          onClick={ handleClickMain }
        />
        <ButtonNavigation
          className={`navigation-popup__button-navigation ${ pathname === "/movies" && "navigation-popup__button-navigation_active" }`}
          buttonTitle="Фильмы" 
          onClick={ handleClickMovies } 
        />
        <ButtonNavigation 
          className={`navigation-popup__button-navigation ${ pathname === "/saved-movies" && "navigation-popup__button-navigation_active" }`}
          buttonTitle="Сохранённые фильмы" 
          onClick={ handleClickSavedMovies } 
        />
        <ButtonProfile 
          className="navigation-popup__button-profile" 
          pathname={ pathname } 
          onClick={ handleClickProfile }
        />
        <ButtonClose
          className="navigation-popup__button-close"
          pathname={pathname}
          onClick={handleClosePopup} 
        />
      </ul>  
    </section>
  )
}
