import promo_logo from '../../../images/promo_logo.svg'

export default function Promo() {
  return (
      <section className="promo" id="promo">
        <img className="promo__logo" src={ promo_logo } alt="Логотип учебного проекта"/>
        <h1 className="text text_narrow promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      </section>
  )
} 