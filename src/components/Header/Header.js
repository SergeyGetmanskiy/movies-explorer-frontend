import Navigation from '../Navigation/Navigation';

import ButtonText from '../UI/Buttons/ButtonText/ButtonText';
import ButtonLogo from '../UI/Buttons/ButtonLogo/ButtonLogo';
import ButtonSignin from '../UI/Buttons/ButtonSignin/ButtonSignin';

export default function Header({ loggedIn, onLogo, onFilms, onSavedFilms, onRegister, onSignin, onProfile }) {
  return (
      <header className="header">
        <div className="header__container">
          <ButtonLogo onClick={ onLogo }/>
          { loggedIn ? <Navigation onFilms={onFilms} onSavedFilms={onSavedFilms} onProfile={onProfile}/> : null}
          { !loggedIn ? <ButtonText className="header__button-text" buttonTitle="Регистрация" onClick={ onRegister } /> : null}
          { !loggedIn ? <ButtonSignin className="header__button-signin" buttonTitle="Войти" onClick={ onSignin } /> : null}
        </div>
      </header>
  )
} 