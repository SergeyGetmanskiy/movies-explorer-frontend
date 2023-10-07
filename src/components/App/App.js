import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {

  const [ loggedIn, setLoggedIn ] = React.useState(false);

  return (
    <div className="app">
        <Header loggedIn={loggedIn}/>
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/movies" element={''} />
          <Route path="/saved-movies" element={''} />
          <Route path="/profile" element={''} />
          <Route path="/signin" element={''} />
          <Route path="/signup" element={''} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
