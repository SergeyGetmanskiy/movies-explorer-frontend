export default function ButtonText({ className, buttonTitle, onClick }) {
  return (
    <button className={`button-text ${ className }`}
            type="button"
            onClick={ onClick }
    >{ buttonTitle }</button>
  )
}