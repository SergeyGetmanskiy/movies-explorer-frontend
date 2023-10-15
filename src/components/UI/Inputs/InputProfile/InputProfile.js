import { useState } from "react";

export default function InputProfile({  name,
                                        id,
                                        type,
                                        placeholder,
                                        required,
                                        minLength,
                                        maxLength,
                                        value,
                                        pattern,
                                        setValue,
                                        setIsInputValid,
                                        isInputValid,
                                        isInputReadOnly }) {

  const [ errorMessage, setErrorMessage ] = useState('');
  
  function handleChange(e) {
    setValue(e.target.value);
    checkInputValidity(e);
  }

  function checkInputValidity(e) {
    if (!e.target.validity.valid) {
      setErrorMessage(e.target.validationMessage);
      setIsInputValid(false);
    } else { 
      setErrorMessage('');
      setIsInputValid(true);
    }
  }

  return (
    <div className="input-edit-profile__container">
      <h3 className="text input-edit-profile__title">{ placeholder }</h3>
      <input
        className="input-edit-profile__input"
        name={name}
        id={id}
        type={type}
        required={ required }
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        value={value}
        onInput={handleChange}
        readOnly={isInputReadOnly}
      />
      <span className={`text input-edit-profile__error ${ isInputValid ? '' : 'input-edit-profile__error_visible' }`}>
        {errorMessage}
      </span>
    </div>
  )
}