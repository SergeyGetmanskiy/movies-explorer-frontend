import { useState } from "react";

export default function InputAuth({ 
  name,
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
  isInputValid }) {

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
    <div className="input-auth">
      <h3 className="text input-auth__title">{ placeholder }</h3>
      <input
      className={`input-auth__input ${ !isInputValid && "input-auth__input_invalid" }`}
      name={name}
      id={id}
      type={type}
      required={ required }
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      value={value}
      onInput={handleChange}
      autoComplete="on"
      />
      <span className={`text input-auth__error ${ isInputValid ? '' : 'input-auth__error_visible' }`}>{errorMessage}</span>
    </div>
  )
}