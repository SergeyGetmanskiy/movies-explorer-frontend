export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="text portfolio__heading">Портфолио</h2>
      <ul className="text text_narrow portfolio__links">
        <li className="portfolio__link">
          <p className="portfolio__link-name">Статичный сайт</p>
          <a className="portfolio__link-arrow"
            href="https://github.com/SergeyGetmanskiy/how-to-learn"
            target="_blank"
            rel="noopener noreferrer">↗</a>
          <hr className="horizontal-line horizontal-line_place_portfolio"></hr>
        </li>
        <li className="portfolio__link">
          <p className="portfolio__link-name">Адаптивный сайт</p>
          <a className="portfolio__link-arrow"
            href="https://github.com/SergeyGetmanskiy/russian-travel"
            target="_blank"
            rel="noopener noreferrer">↗</a>
          <hr className="horizontal-line horizontal-line_place_portfolio"></hr>
        </li>
        <li className="portfolio__link">
          <p className="portfolio__link-name">Одностраничное приложение</p>
          <a className="portfolio__link-arrow"
            href="https://github.com/SergeyGetmanskiy/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer">↗</a>
        </li>
      </ul>
    </section>
  )
} 