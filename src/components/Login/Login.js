import { useState } from "react";

import Auth from "../Auth/Auth";
import InputAuth from "../UI/Inputs/InputAuth/InputAuth";

export default function Login({ onLogo, onSignup, onLogin, errorMessage }) {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ isEmailInputValid, setIsEmailInputValid ] = useState(true);
  const [ isPasswordInputValid, setIsPasswordInputValid ] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      email: e.target[1].value,
      password: e.target[2].value,
    }
    onLogin(data);
  }

  return (
    <Auth
    authHeading="Рады видеть!"
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