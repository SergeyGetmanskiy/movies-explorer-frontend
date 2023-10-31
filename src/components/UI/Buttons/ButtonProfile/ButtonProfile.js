export default function ButtonProfile({ className, pathname, onClick }) {
  return (
    <button
      className={`button-profile ${ className } ${ pathname === '/' ? "button-profile_background_blue" : "button-profile_background_black" }`} 
      type="button"
      onClick={ onClick }
    />
  )
}