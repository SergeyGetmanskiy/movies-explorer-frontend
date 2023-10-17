export default function ButtonLike({ className, onClick, isLiked }) {
  return (
    <button className={`button-like ${ isLiked ? "button-like_active" : "button-like_disabled" } ${className}`} 
            type="button"
            onClick={ onClick }
    />
  )
}