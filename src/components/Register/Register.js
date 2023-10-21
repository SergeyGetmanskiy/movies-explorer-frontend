import { useState } from "react";

import Auth from "../Auth/Auth";
import InputAuth from "../UI/Inputs/InputAuth/InputAuth";

export default function Register({ onLogo, onSignin }) {

  const [ name, setName ] = useState("Виталий");
  const [ email, setEmail ] = useState("pochta@yandex.ru");
  const [ password, setPassword ] = useState("12345678");

  const [ isNameInputValid, setIsNameInputValid ] = useState(true);
  const [ isEmailInputValid, setIsEmailInputValid ] = useState(true);
  const [ isPasswordInputValid, setIsPasswordInputValid ] = useState(false);

  const [ errorMessage, setErrorMessage ] = useState("При регистрации пользователя произошла ошибка.");

  function handleSubmit(e) {
 
  }

  return (
    <Auth authHeading="Добро пожаловать!"
          submitButtonTitle="Зарегистрироваться"
          textButtonTitle="Войти"
          textButtonMessage="Уже зарегистрированы?"
          errorMessage={ errorMessage }
          onLogo={ onLogo }
          onSubmit={ handleSubmit }
          isSubmitButtonActive={ isNameInputValid && isEmailInputValid && isPasswordInputValid }
          onTextButton={ onSignin }
    >
      <InputAuth
        name="name"
        id="input-auth-name"
        type="text"
        placeholder="Имя"
        required={ true }
        minLength={2}
        maxLength={40}
        value={ name }
        pattern="[А-ЯЁа-яёA-Za-z\-\s]*"
        setValue={setName}
        setIsInputValid={setIsNameInputValid}
        isInputValid={isNameInputValid}
      />
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