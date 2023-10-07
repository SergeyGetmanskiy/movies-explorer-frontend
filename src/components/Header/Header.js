import ButtonText from '../UI/Buttons/ButtonText/ButtonText';
import ButtonNavigation from '../UI/Buttons/ButtonNavigation/ButtonNavigation';
import ButtonLogo from '../UI/Buttons/ButtonLogo/ButtonLogo';
import ButtonSignin from '../UI/Buttons/ButtonSignin/ButtonSignin';
import ButtonProfile from '../UI/Buttons/ButtonProfile/ButtonProfile';

export default function Header({ loggedIn, onLogo, onFilms, onSavedFilms, onRegister, onSignin, onProfile }) {
  return (
      <header className="header">
        <div className="header__container">
          <ButtonLogo className="header__button-logo" onClick={ onLogo }/>
          { loggedIn ? <ButtonNavigation className="header__button-navigation" buttonTitle="Фильмы" onClick={ onFilms } /> : null}
          { loggedIn ? <ButtonNavigation className="header__button-navigation" buttonTitle="Сохранённые фильмы" onClick={ onSavedFilms } /> : null}
          { !loggedIn ? <ButtonText className="header__button-text" buttonTitle="Регистрация" onClick={ onRegister } /> : null}
          { !loggedIn ? <ButtonSignin className="header__button-signin" buttonTitle="Войти" onClick={ onSignin } /> : null}
          { loggedIn ? <ButtonProfile className="header__button-profile" onClick={ onProfile } /> : null}
        </div>
      </header>
  )
} 