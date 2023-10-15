import { useState } from "react";

import InputProfile from "../UI/Inputs/InputProfile/InputProfile"
import ButtonText from "../UI/Buttons/ButtonText/ButtonText"
import ButtonBar from "../UI/Buttons/ButtonBar/ButtonBar";
import ApiErrorMessage from "../UI/ApiErrorMessage/ApiErrorMessage";

export default function Profile({ onSignout }) {

  const [ isInputReadOnly, setIsInputReadOnly ] = useState(true);

  const [ name, setName ] = useState("Виталий");
  const [ email, setEmail ] = useState("pochta@yandex.ru");

  const [ isNameInputValid, setIsNameInputValid ] = useState(true);
  const [ isEmailInputValid, setIsEmailInputValid ] = useState(true);

  const [ errorMessage, setErrorMessaged ] = useState("При обновлении профиля произошла ошибка.");

  function handleEditClick() {
    setIsInputReadOnly(false);
  }

  function handleSubmit(e) {
    console.log(e.target);
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h1 className="text profile__heading">Привет, Виталий!</h1>
        <InputProfile
          name="name"
          id="profile-input-name"
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
          isInputReadOnly={isInputReadOnly}
        />
        <hr className="profile__horizontal-line"></hr>
        <InputProfile
          name="email"
          id="profile-input-email"
          type="email"
          placeholder="Email"
          required={ true }
          value={ email }
          pattern="^\S+@\S+\.\S+$"
          setValue={setEmail}
          setIsInputValid={setIsEmailInputValid}
          isInputValid={isEmailInputValid}
          isInputReadOnly={isInputReadOnly}
        />
        { isInputReadOnly &&
          <ButtonText className={`profile__edit-button`}
                      buttonTitle={"Редактировать"}
                      onClick={ handleEditClick } />
        }
        { isInputReadOnly ?
          <ButtonText className={`profile__signout-button`}
                      buttonTitle={"Выйти из аккаунта"}
                      onClick={ onSignout } />
          :
          <ButtonBar className="profile__button-bar"
                     buttonTitle="Сохранить"
                     onClick={ handleSubmit }
                     isButtonActive={ isNameInputValid && isEmailInputValid }>
            <ApiErrorMessage errorMessage={errorMessage}/>
          </ButtonBar>
        }        
      </div>
    </div>
  )
} 