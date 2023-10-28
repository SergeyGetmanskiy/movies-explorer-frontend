import { useState, useEffect } from 'react';
import { Routes,
         Route,
         useLocation,
         useNavigate } from 'react-router-dom';       
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import Footer from '../Footer/Footer';
import InfoPopup from '../InfoPopup/InfoPopup';

import { REGISTER_SUCCESS_MESSAGE,
         PROFILE_UPDATE_SUCCESS_MESSAGE } from '../../utils/constants';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';


function App() {

  const [ currentUser, setCurrentUser ] = useState({});

  const [ moviesFound, setMoviesFound ] = useState([]);

  const [ savedMovies, setSavedMovies ] = useState([]);

  const [ width, setWidth ] = useState(window.innerWidth);

  const [ loggedIn, setLoggedIn ] = useState(false);
   
  const { pathname } = useLocation();

  const [ errorMessage, setErrorMessage ] = useState("");

  const [ isInfoPopupOpen, setIsInfoPopupOpen ] = useState(false);
  const [ infoPopupMessage, setInfoPopupMessage ] = useState('');

  const navigate = useNavigate();

  function getUserAndMovies() {
    Promise.all([ mainApi.getUserInfo(), mainApi.getMoviesList() ])
    .then(([ user, movies ]) => {
      setCurrentUser(user);
      setSavedMovies(movies);
      }
    )
    .catch((err) => {
      console.log(err);
    })
  }

  function handleError(err) {
    const error = JSON.parse(err.message);
    setErrorMessage(error.message);
  }

  function handleLogoClick() {
    navigate('/', {replace: true});
  }

  function handleMoviesClick() {
    navigate('/movies', {replace: true});
  }

  function handleSavedMoviesClick() {
    navigate('/saved-movies', {replace: true});
  }

  function handleProfileClick() {
    setErrorMessage('');
    navigate('/profile', {replace: true});
  }

  function handleSignupClick() {
    setErrorMessage('');
    navigate('/signup', {replace: true});
  }

  function handleSigninClick() {
    setErrorMessage('');
    navigate('/signin', {replace: true});
  }

  function handleSignOutClick() {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/', {replace: true});
  }

  function handleRegister(data) {                           // Регистрация
    mainApi.register(data)
    .then((res) => {
      handleLogin(data);
      setIsInfoPopupOpen(true);
      setInfoPopupMessage(REGISTER_SUCCESS_MESSAGE);
    })
    .catch((err) => {
      handleError(err);
    })  
  }

  function handleLogin(data) {                              // Логин
    mainApi.login(data.email, data.password)
    .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/movies', {replace: true});
        getUserAndMovies();
        })
    .catch((err) => {
      handleError(err);
      setLoggedIn(false);
      navigate('/signin', {replace: true});
    })
  }   

  function handleUpdateUser(data) {                        // Редактирование профиля 
    mainApi.setUserInfo(data).then(res => {
      setCurrentUser(res);
      setIsInfoPopupOpen(true);
      setInfoPopupMessage(PROFILE_UPDATE_SUCCESS_MESSAGE);
      navigate('/movies', {replace: true});
    })
    .catch((err) => {
      handleError(err);
    })
  }
                                                            
  function handleCardLike(card) {                         // Обработчик клика по лайку
    console.log(card);
    if(!card.likes) {
      mainApi.postUserMovie(card).then((card) => {
        console.log(card.movie);
        setSavedMovies([card.movie, ...savedMovies]);
        const updatedMoviesList = [...moviesFound];
        const updatedMovie = updatedMoviesList.find(movie => movie._id === card.movie.movieId);
        console.log(updatedMovie);
        updatedMovie.likes = true;
        setMoviesFound(updatedMoviesList);
        localStorage.setItem('movies', JSON.stringify(updatedMoviesList));
      })
        .catch((err) => {
          console.log(err);
        })
    } else {
      const updatedSavedMovies = [...savedMovies];
      const updatedSavedMovie = updatedSavedMovies.find(movie => movie.movieId === card.id);
      console.log(updatedSavedMovie._id);
      handleCardDelete(updatedSavedMovie._id);
    }
  }

  function handleCardDelete(cardId, movieId) {                     // Обработчик клика по крестику
    mainApi.deleteUserMovie(cardId).then(() => {
      console.log(movieId);
      setSavedMovies(savedMovies.filter((card) => card._id !== cardId));
      const updatedMoviesList = [...moviesFound];
      const updatedMovie = updatedMoviesList.find(movie => movie.id === movieId);
      console.log(updatedMovie);
      updatedMovie.likes = false;
      setMoviesFound(updatedMoviesList);
      localStorage.setItem('movies', JSON.stringify(updatedMoviesList));
  })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {                                       // Проверка ширины экрана
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
   }, []);


  useEffect(() => {                                       // Проверка токена
    const checkToken = () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        mainApi.checkToken(jwt)
        .then((res) => {
            setLoggedIn(true); 
            getUserAndMovies();      
            navigate("/", {replace: true})
          })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          navigate("/", {replace: true})
        })  
      }
    } 
  checkToken();
  }, []) 

 
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        { (pathname === "/" || pathname === "/movies" || pathname === "/saved-movies" || pathname === "/profile" ) && 
        <Header width={ width }
                loggedIn={ loggedIn }
                pathname={ pathname }
                onLogo={ handleLogoClick }
                onMovies={ handleMoviesClick }
                onSavedMovies={ handleSavedMoviesClick }  
                onProfile={ handleProfileClick }
                onRegister={ handleSignupClick }
                onSignin={ handleSigninClick }     
        />}
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/movies" element={ <ProtectedRoute  element={ Movies }
                                                           loggedIn={ loggedIn }
                                                           width={ width }
                                                           onCardLike={ handleCardLike }
                                                           moviesFound={ moviesFound }
                                                           setMoviesFound={ setMoviesFound } /> } /> 
          <Route path="/saved-movies" element={ <ProtectedRoute element={ SavedMovies }
                                                                loggedIn={ loggedIn }
                                                                width={ width }
                                                                savedMovies={ savedMovies }
                                                                onCardDelete={ handleCardDelete } /> } />
          <Route path="/profile" element={ <ProtectedRoute element={ Profile }
                                                           loggedIn={ loggedIn }
                                                           onSignout={ handleSignOutClick }
                                                           onUpdate={ handleUpdateUser }
                                                           errorMessage={ errorMessage } /> } />
          <Route path="/signin" element={ <Login onLogo={ handleLogoClick }
                                                 onSignup={ handleSignupClick }
                                                 onLogin={ handleLogin }
                                                 errorMessage={ errorMessage } /> } />
          <Route path="/signup" element={ <Register onLogo={ handleLogoClick }
                                                    onSignin={ handleSigninClick }
                                                    onRegister={ handleRegister }
                                                    errorMessage={ errorMessage } /> } />
          <Route path="*" element={ <PageNotFound /> } />
        </Routes>
        { (pathname === "/" || pathname === "/movies" || pathname === "/saved-movies") && <Footer /> }
        <InfoPopup isOpen={ isInfoPopupOpen } onClose={ () => setIsInfoPopupOpen(false) } message={ infoPopupMessage } />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
