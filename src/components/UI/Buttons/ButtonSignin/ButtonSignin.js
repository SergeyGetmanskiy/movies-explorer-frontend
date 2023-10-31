export default function ButtonSignin({ className, buttonTitle, onClick }) {
  return (
    <button className={`button-signin ${ className }`} type="button" onClick={ onClick }>{ buttonTitle }</button>
  )
}