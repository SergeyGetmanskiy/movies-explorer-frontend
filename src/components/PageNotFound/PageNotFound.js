import ButtonText from "../UI/Buttons/ButtonText/ButtonText"

export default function PageNotFound({ onRewind }) {

  return (
    <div className="page-not-found">
      <div className="page-not-found__container">
        <h1 className="text page-not-found__heading">404</h1>
        <h2 className="text page-not-found__message">Страница не найдена</h2>
        <ButtonText className={`page-not-found__button-text`} buttonTitle="Назад" onClick={ onRewind } />
      </div>
    </div>
  )
} 