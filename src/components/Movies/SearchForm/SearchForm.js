import FilterCheckbox from "./FilterCheckbox/FilterCheckbox"

export default function SearchForm() {
  return (
    <form className="search-form">
      <div className="search-form__input">
        <input className="search-form__search-field" type="search" placeholder="Фильм" name="search" required />
        <button className="search-form__button"/>
      </div>
      <FilterCheckbox className="search-form__input" /> 
      <hr className="search-form__horizontal-line" />
    </form>
  )
} 