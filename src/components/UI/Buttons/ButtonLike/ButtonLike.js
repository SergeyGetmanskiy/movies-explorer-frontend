export default function ButtonLike({ className, isLiked, onCardLike }) {

  return (
    <button
    className={`button-like ${ isLiked ? "button-like_active" : "button-like_disabled" } ${className}`} 
    type="button"
    onClick={ onCardLike }
    />
  )
}