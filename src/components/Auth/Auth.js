import ButtonLogo from "../UI/Buttons/ButtonLogo/ButtonLogo";
import ButtonText from "../UI/Buttons/ButtonText/ButtonText"
import ButtonBar from "../UI/Buttons/ButtonBar/ButtonBar";
import ApiErrorMessage from "../UI/ApiErrorMessage/ApiErrorMessage";

export default function Auth({ authHeading,
                               submitButtonTitle,
                               textButtonTitle,
                               textButtonMessage,
                               errorMessage,
                               onLogo,
                               onSubmit,
                               isSubmitButtonActive,
                               onTextButton,
                               children }) {

  return (
    <main className="auth">
      <form className="auth__container"
            noValidate="noValidate"
            onSubmit={ onSubmit }
      >
        <ButtonLogo className={"auth__button-logo"} onClick={ onLogo } />
        <h1 className="text auth__heading">{ authHeading }</h1>
        { children }
        <ButtonBar buttonTitle={ submitButtonTitle } isButtonActive={ isSubmitButtonActive }>
          <ApiErrorMessage errorMessage={ errorMessage }/>
        </ButtonBar> 
        <div className="auth__footer">
          <p className="auth__message">{ textButtonMessage }</p>  
          <ButtonText className={`auth__button-text`} buttonTitle={ textButtonTitle } onClick={ onTextButton } />
        </div>
      </form>
    </main>
  )
} 