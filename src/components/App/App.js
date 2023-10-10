import React from 'react';
import { Routes,
         Route,
         useLocation,
         useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';

import { movies, savedMovies } from '../../utils/constants';

function App() {

  const [ loggedIn, setLoggedIn ] = React.useState(true);
  const [ isLoading, setIsLoading ] = React.useState(false);
  const { pathname } = useLocation();
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

  return (
    <div className="app">
        <Header loggedIn={loggedIn}
                pathname={ pathname }
                onLogo={ handleLogoClick }
                onMovies={ handleMoviesClick }
                onSavedMovies={ handleSavedMoviesClick }        
        />
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/movies" element={ <Movies cards={ movies } isLoading={ isLoading }/> } />
          <Route path="/saved-movies" element={ <SavedMovies cards={ savedMovies } /> } />
          <Route path="/profile" element={''} />
          <Route path="/signin" element={''} />
          <Route path="/signup" element={''} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
