export default function ButtonBar({ className,
                                    buttonTitle,
                                    isButtonActive,
                                    onClick,
                                    children }) {

  return (
    <div className={`button-bar ${ className }`}>
      { children }
      <button className={`button-bar__button ${ !isButtonActive && "button-bar__button_disabled" }`}
              onClick={ onClick }
              type="submit"
              disabled={ !isButtonActive }
      >{ buttonTitle }
      </button> 
    </div>
  )
}