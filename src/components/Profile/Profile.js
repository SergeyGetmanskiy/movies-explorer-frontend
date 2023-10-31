import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";

import InputProfile from "../UI/Inputs/InputProfile/InputProfile"
import ButtonText from "../UI/Buttons/ButtonText/ButtonText"
import ButtonBar from "../UI/Buttons/ButtonBar/ButtonBar";
import ApiErrorMessage from "../UI/ApiErrorMessage/ApiErrorMessage";

export default function Profile({ onSignout, onUpdate, errorMessage  }) {

  const currentUser = useContext(CurrentUserContext);

  const [ isInputDisabled, setIsInputDisabled ] = useState(true);

  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");

  const [ isNameInputValid, setIsNameInputValid ] = useState(true);
  const [ isEmailInputValid, setIsEmailInputValid ] = useState(true);

  const [ isButtonActive, setIsButtonActive ] = useState(false);

  function handleEditClick() {
    setIsInputDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsButtonActive(false);
    onUpdate({
      name: name,
      email: email,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]); 

  useEffect(() => {
    ((name !== currentUser.name || email !== currentUser.email) && (isNameInputValid && isEmailInputValid))
    ? setIsButtonActive(true) 
    : setIsButtonActive(false);
  }, [name, email ]); 

  return (
    <main className="profile">
      <form className="profile__container" noValidate="noValidate" onSubmit={ handleSubmit }>
        <h1 className="text profile__heading">{`Привет, ${currentUser.name}!`}</h1>
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
          isInputDisabled={isInputDisabled}
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
          isInputDisabled={isInputDisabled}
        />
        { isInputDisabled &&
          <ButtonText className={`profile__edit-button`} buttonTitle={"Редактировать"} onClick={ handleEditClick } />
        }
        { isInputDisabled ?
          <ButtonText className={`profile__signout-button`} buttonTitle={"Выйти из аккаунта"} onClick={ onSignout } />
          :
          <ButtonBar className="profile__button-bar" buttonTitle="Сохранить" isButtonActive={ isButtonActive } >
            <ApiErrorMessage errorMessage={errorMessage}/>
          </ButtonBar>
        }        
      </form>
    </main>
  )
} 