export default function ButtonNavigation({ className, buttonTitle, onClick }) {
  return (
    <button className={`button-navigation ${ className } `} type="button" onClick={ onClick }>{ buttonTitle }</button>
  )
}