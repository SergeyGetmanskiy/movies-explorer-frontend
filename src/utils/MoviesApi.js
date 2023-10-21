class MoviesApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkServerResponse(res) {
    if(res.ok) {
      return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(this._checkServerResponse)}
};

export const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co'
});
