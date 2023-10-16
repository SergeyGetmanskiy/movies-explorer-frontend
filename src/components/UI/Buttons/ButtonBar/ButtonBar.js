export default function ButtonBar({ className,
                                    buttonTitle,
                                    onClick,
                                    isButtonActive,
                                    children }) {
  return (
    <div className={`button-bar ${ className }`}>
      { children }
      <button className={`button-bar__button ${ !isButtonActive && "button-bar__button_disabled" }`} 
        type="button"
        onClick={ onClick }
        disabled={ !isButtonActive }
      >{ buttonTitle }
      </button> 
    </div>
  )
}