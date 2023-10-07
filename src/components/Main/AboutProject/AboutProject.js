export default function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <h2 className="text text_narrow section__heading">О проекте</h2>
      <hr className="section__horizontal-line" />
      <div className="about-project__features">
        <div className="about-project__feature">
          <h3 className="text text_narrow about-project__feature-heading">Дипломный проект включал 5 этапов</h3>
          <p className="text about-project__feature-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__feature">
          <h3 className="text text_narrow about-project__feature-heading">На выполнение диплома ушло 5 недель</h3>
          <p className="text about-project__feature-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__timeline">
        <p className="text about-project__item1">1 неделя</p>
        <p className="text about-project__item2">4 недели</p>
        <p className="text about-project__item3">Back-end</p>
        <p className="text about-project__item4">Front-end</p>
      </div>
    </section>
  )
} 