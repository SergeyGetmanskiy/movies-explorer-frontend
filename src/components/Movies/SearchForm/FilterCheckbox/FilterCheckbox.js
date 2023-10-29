import { useState } from "react";

export default function FilterCheckbox({ className, onCheckbox, isChecked }) {

  const [ value, setValue ] = useState();

  function handleChange(e) {
    onCheckbox(e.target.checked);
    setValue(e.target.value);
  }

  return (
      <div className={`filter-checkbox ${ className }`}> 
        <input
        className="filter-checkbox__checkbox"
        type="checkbox" id="shortfilms"
        onChange={ handleChange }
        checked={ isChecked }
        value={ value }
        />
        <label className="text filter-checkbox__label" htmlFor="shortfilms">Короткометражки</label>
      </div>
  )
} 