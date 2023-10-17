export default function ButtonClose({ className, onClick }) {
  return (
    <button className={`button-close ${className}`} 
            type="button"
            onClick={ onClick }
    />
  )
}