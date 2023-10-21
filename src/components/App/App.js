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
import { moviesApi } from '../../utils/MoviesApi';
import { mainApi } from '../../utils/MainApi';

function App() {

  const [ width, setWidth ] = useState(window.innerWidth);
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
   }, []);

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isFound, setIsFound ] = useState(true);    
  const { pathname } = useLocation();

  const [ movies, setMovies ] = useState([]);
  const [ moviesFound, setMoviesFound ] = useState([]);

  const [ query, setQuery ] = useState('');

  const navigate = useNavigate();

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
    navigate('/profile', {replace: true});
  }

  function handleSignupClick() {
    navigate('/signup', {replace: true});
    setLoggedIn(true);
  }

  function handleSigninClick() {
    navigate('/signin', {replace: true});
    setLoggedIn(true);
  }

  function handleSignOutClick() {
    setLoggedIn(false);
    navigate('/', {replace: true});
  }


  function handleRegister(name, email, password) {          // Регистрация
    mainApi.setUserInfo(name, email, password)
    .then((res) => {
        console.log('Registered')
      } )
    .catch((err) => {
      console.log(err); 
    })  
  }

                                                              // Фильтрация фильмов в соответствии с поисковым запросом
  function searchMovies(movies, query) {                    
    const result = movies.filter((movie) => movie.nameRU.includes(query));
    if(result.length > 0) {
      setMoviesFound(result);
      setIsFound(true);
    } else {
      setMoviesFound([]);
      setIsFound(false);
    };
  }

                                                              // Загрузка фильмов при первом валидном поисковом запрос
  useEffect(() => {                                         
    if((movies.length === 0) && (query.length !== 0)) {
      setIsLoading(true);
      moviesApi.getMovies()
      .then((movies) => {
        setMovies(movies);
        setIsLoading(false);
        searchMovies(movies, query);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [movies, query])

  useEffect(() => {                                         
    if(movies.length !== 0) {
      searchMovies(movies, query);
    }
  }, [movies, query])
  



  return (
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
          <Route path="/movies" element={ <Movies cards={ moviesFound }
                                                  isLoading={ isLoading }
                                                  isFound={ isFound }
                                                  setQuery={ setQuery } /> } 
          />
          <Route path="/saved-movies" element={ <SavedMovies cards={ "" } /> } />
          <Route path="/profile" element={ <Profile onSignout={ handleSignOutClick } /> } />
          <Route path="/signin" element={ <Login onLogo={ handleLogoClick } onSignup={ handleSignupClick } /> } />
          <Route path="/signup" element={ <Register onLogo={ handleLogoClick } onSignin={ handleSigninClick } onRegister={ handleRegister } /> } />
          <Route path="*" element={ <PageNotFound /> } />
        </Routes>
        { (pathname === "/" || pathname === "/movies" || pathname === "/saved-movies") && <Footer /> }
    </div>
  );
}

export default App;
