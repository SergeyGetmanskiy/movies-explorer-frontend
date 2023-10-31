export default function ButtonDelete({ className, onCardDelete }) {
  return (
    <button className={`button-delete ${className}`} type="button" onClick={ onCardDelete } />
  )
}