export default function FilterCheckbox({ className }) {
  return (
      <div className={`filter-checkbox ${ className }`}> 
        <input className="filter-checkbox__checkbox" type="checkbox" id="shortfilms" />
        <label className="text filter-checkbox__label" htmlFor="shortfilms">Короткометражки</label>
      </div>
  )
} 