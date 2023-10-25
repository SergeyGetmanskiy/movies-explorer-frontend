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

  const [ width, setWidth ] = useState(window.innerWidth);

  const [ loggedIn, setLoggedIn ] = useState(false);
   
  const { pathname } = useLocation();

  const [ savedMovies, setSavedMovies ] = useState([]);

  const [ errorMessage, setErrorMessage ] = useState("");

  const [ isInfoPopupOpen, setIsInfoPopupOpen ] = useState(false);
  const [ infoPopupMessage, setInfoPopupMessage ] = useState('');

  const navigate = useNavigate();

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

  function handleRegister(data) {                             // Регистрация
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

  function handleLogin(data) {                               // Логин
    mainApi.login(data.email, data.password)
    .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        navigate('/movies', {replace: true});
        mainApi.getUserInfo()
        .then((res) => {
          setCurrentUser({ name: res.name,
                           email: res.email })
        })
        .catch((err) => {
          handleError(err);
        })
        })
    .catch((err) => {
      handleError(err);
      setLoggedIn(false);
      navigate('/signin', {replace: true});
    })
  }   

  function handleUpdateUser(data) {                          // Редактирование профиля 
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
                                                            
  function handleCardLike(card) {                           // Обработчик клика по лайку
  //  const isLiked = card.likes.some(i => i === currentUser._id);
    mainApi.postUserMovie(card).then((savedCard) => {
      setSavedMovies([savedCard, ...savedMovies]);
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
          setCurrentUser({ name: res.name,
                           email: res.email })
          navigate('/', {replace: true});
        })
        .catch((err) => {
          console.log(err);
          handleError(err);
          localStorage.clear();
          setLoggedIn(false);
          navigate('/', {replace: true});
        })  
      } else {
        setLoggedIn(false);
      }
    }; 
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
                                                           onCardLike={ handleCardLike } /> } /> 
          <Route path="/saved-movies" element={ <ProtectedRoute element={ SavedMovies }
                                                                loggedIn={ loggedIn }
                                                                cards={ savedMovies } /> } />
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
