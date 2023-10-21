import { useState } from "react";

import Auth from "../Auth/Auth";
import InputAuth from "../UI/Inputs/InputAuth/InputAuth";

export default function Login({ onLogo, onSignup }) {

  const [ email, setEmail ] = useState("pochta@yandex.ru");
  const [ password, setPassword ] = useState("12345678");

  const [ isEmailInputValid, setIsEmailInputValid ] = useState(true);
  const [ isPasswordInputValid, setIsPasswordInputValid ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState("Вы ввели неправильный логин или пароль. ");

  function handleSubmit(e) {
 
  }

  return (
    <Auth authHeading="Рады видеть!"
          submitButtonTitle="Войти"
          textButtonTitle="Регистрация"
          textButtonMessage="Ещё не зарегистрированы?"
          errorMessage={ errorMessage }
          onLogo={ onLogo }
          onSubmit={ handleSubmit }
          isSubmitButtonActive={ isEmailInputValid && isPasswordInputValid }
          onTextButton={ onSignup }
    >
      <InputAuth
        name="email"
        id="input-auth-email"
        type="email"
        placeholder="E-mail"
        required={ true }
        value={ email }
        pattern="^\S+@\S+\.\S+$"
        setValue={setEmail}
        setIsInputValid={setIsEmailInputValid}
        isInputValid={isEmailInputValid}
      />
      <InputAuth
        name="password"
        id="input-auth-password"
        type="password"
        placeholder="Пароль"
        required={ true }
        minLength={8}
        value={ password }
        pattern="^[A-Za-z0-9]*"
        setValue={setPassword}
        setIsInputValid={setIsPasswordInputValid}
        isInputValid={ isPasswordInputValid }
      />
    </Auth>
  )
} 