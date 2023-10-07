export default function ButtonProfile({ className, onClick }) {
  return (
    <button className={`button-profile ${ className }`} 
            type="button"
            onClick={ onClick }
    />
  )
}