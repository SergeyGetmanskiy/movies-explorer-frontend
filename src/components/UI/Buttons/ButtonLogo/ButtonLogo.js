export default function ButtonLogo({ className, onClick }) {
  return (
    <button className={`button-logo ${ className }`} type="button" onClick={ onClick } />
  )
}