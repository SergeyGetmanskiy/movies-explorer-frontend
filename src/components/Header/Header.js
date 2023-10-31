import Navigation from '../Navigation/Navigation';

import ButtonText from '../UI/Buttons/ButtonText/ButtonText';
import ButtonLogo from '../UI/Buttons/ButtonLogo/ButtonLogo';
import ButtonSignin from '../UI/Buttons/ButtonSignin/ButtonSignin';

export default function Header({
  width,
  loggedIn,
  pathname,
  onLogo,
  onMovies,
  onSavedMovies,
  onRegister,
  onSignin,
  onProfile }) {
  return (
    <header className={ `header ${ pathname === '/' ? "header_blue" : "header_black" }` }>
      <div className="header__container">
        <ButtonLogo onClick={ onLogo }/>
        { loggedIn ? <Navigation
          width={width}
          pathname={pathname}
          loggedin={loggedIn}
          onMovies={onMovies}
          onSavedMovies={onSavedMovies}
          onProfile={onProfile}
          onLogo={onLogo}/> : null }
        { !loggedIn ? <ButtonText className="header__button-text" buttonTitle="Регистрация" onClick={ onRegister } /> : null}
        { !loggedIn ? <ButtonSignin className="header__button-signin" buttonTitle="Войти" onClick={ onSignin } /> : null}
      </div>
    </header>
  )
} 