export default function FilterCheckbox({ className, onCheckbox }) {

  function handleChange(e) {
    onCheckbox(e.target.checked);
  }

  return (
      <div className={`filter-checkbox ${ className }`}> 
        <input className="filter-checkbox__checkbox" type="checkbox" id="shortfilms" onChange={ handleChange } />
        <label className="text filter-checkbox__label" htmlFor="shortfilms">Короткометражки</label>
      </div>
  )
} 