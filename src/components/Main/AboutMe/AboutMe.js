import avatar from '../../../images/avatar.jpg'

export default function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h2 className="text text_narrow heading">Студент</h2>
      <hr className="horizontal-line" />
      <div className="about-me__container">
        <div className="about-me__text">
          <p className="text text_narrow about-me__name">Сергей</p>
          <p className="text about-me__about">Фронтенд-разработчик, 44 года</p>
          <p className="text about-me__description">
            Совместил увлечение программированием и свободное владение английским языком,
            чтобы полностью изменить сферу трудовой деятельности. Теперь погрузился в Доку,
            MDN, учебники по JS. Особенно заинтересовали возможности браузерных API.
            После прохождения курса по веб-разработке почувствовал в себе силы создать
            веб-приложение любой сложности практически с чистого листа.</p>
          <p className="text  about-me__github">Github</p>
        </div>        
        <div className="about-me__avatar-container">
          <img className="about-me__avatar" src={ avatar } alt="Аватарка" />
        </div>
      </div>
    </section>
  )
} 