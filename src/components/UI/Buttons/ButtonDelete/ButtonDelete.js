export default function ButtonDelete({ className, onClick }) {
  return (
    <button className={`button-delete ${className}`} 
            type="button"
            onClick={ onClick }
    />
  )
}