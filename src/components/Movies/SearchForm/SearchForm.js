import { useState, useEffect } from "react";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"

export default function SearchForm( { onSearch, onCheckbox } ) {

  const [ isInputValid, setIsInputValid ] = useState(true);

  const errorMessage = "Нужно ввести ключевое слово."

  function handleSubmit(e) {
    e.preventDefault();
    if (e.target[0].validity.valid) {
      setIsInputValid(true);
      onSearch(e.target[0].value);
    } else { 
      setIsInputValid(false);
    }
  }

  return (
    <form name="search-form"
          noValidate="noValidate"
          onSubmit={ handleSubmit }
          className="search-form">
      <div className="search-form__input">
        <input className="search-form__search-field"
               type="search"
               placeholder="Фильм"
               name="search"
               required="required"
        />
        <button className="search-form__button"
                type="submit"
        />
        <span className={`text search-form__error ${ isInputValid ? '' : 'search-form__error_visible' }`}>{errorMessage}</span>
      </div>
      <FilterCheckbox className="search-form__input" onCheckbox = { onCheckbox } /> 
      <hr className="search-form__horizontal-line" />
    </form>
  )
} 