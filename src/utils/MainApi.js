class MainApi {
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

  _getToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      return token
    } else {
      return null
    }
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
    })
    .then(this._checkServerResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.email,
        password: data.password,
    })})
    .then(this._checkServerResponse)}

  getMoviesList() {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
    })
    .then(this._checkServerResponse)}

  postUserMovie(data) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })})
    .then(this._checkServerResponse)
  }

  deleteUserMovie(movieId) {
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      })
    .then(this._checkServerResponse)
  }

 /* changeLikeCardStatus(cardId, isLiked) {
    const requestMethod = isLiked ? "PUT": "DELETE"; 
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: requestMethod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      })
    .then(this._checkServerResponse)
  }*/
}; 

export const mainApi = new MainApi({
  baseUrl: 'https://api.sgetmansky.backend.nomoredomainsicu.ru'
});