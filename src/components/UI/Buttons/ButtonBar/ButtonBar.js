export default function ButtonBar({ className,
                                    buttonTitle,
                                    onClick,
                                    isButtonActive,
                                    children }) {
  return (
    <div className={`button-bar__container ${ className }`}>
      { children }
      <button className={`button-bar ${ !isButtonActive && "button-bar_disabled" }`} 
        type="button"
        onClick={ onClick }
        disabled={ !isButtonActive }
      >{ buttonTitle }
      </button> 
    </div>
  )
}