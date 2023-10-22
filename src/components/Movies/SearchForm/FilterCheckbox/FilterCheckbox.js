export default function FilterCheckbox({ className, setIsChecked }) {

  return (
      <div className={`filter-checkbox ${ className }`}> 
        <input className="filter-checkbox__checkbox" type="checkbox" id="shortfilms" onChange={ e => setIsChecked(e.target.checked) } />
        <label className="text filter-checkbox__label" htmlFor="shortfilms">Короткометражки</label>
      </div>
  )
} 