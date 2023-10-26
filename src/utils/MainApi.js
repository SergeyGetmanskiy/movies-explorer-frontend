class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _checkServerResponse(res) {
    if(res.ok) {
      return res.json();
      } else {
        return res.text().then(text => { throw new Error(text) })
    }}

  _getToken() {
    const token = localStorage.getItem('jwt');
    if(token) {
      return token
    } else {
      return null
    }
  }

  register(data) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": data.name,
        "email": data.email,
        "password": data.password,
      })
    })
    .then(this._checkServerResponse)
  };

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "password": password,
        "email": email
      })
    })
    .then(this._checkServerResponse)
  };
  
  checkToken(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(this._checkServerResponse);
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
    })
    .then(this._checkServerResponse)
  }

  setUserInfo(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._getToken()}`,
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
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
        imageFull: data.imageFull,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        movieId: data.id,
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
  baseUrl: 'https://api.movies.sgetmansky.nomoredomainsrocks.ru'
}); 