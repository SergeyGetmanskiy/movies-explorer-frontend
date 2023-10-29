import { useState } from 'react';

import ButtonNavigation from '../UI/Buttons/ButtonNavigation/ButtonNavigation';
import ButtonProfile from '../UI/Buttons/ButtonProfile/ButtonProfile';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

export default function Navigation({ width, pathname, onMovies, onSavedMovies, onProfile, onLogo }) {
  
  const [ isPopupOpen, setIsPopupOpen ] = useState(false);
  
  function handleClick() {
    if(width <= 768) {
      setIsPopupOpen(true);
    }
    else {
      onProfile();
      setIsPopupOpen(false);
    }
  }

  if(!isPopupOpen) {
    return (
      <section className="navigation">
        <ButtonNavigation 
        className={`navigation__button-navigation ${ pathname === "/movies" && "navigation__button-navigation_active" }`}
        buttonTitle="Фильмы" 
        onClick={ onMovies } 
        />
        <ButtonNavigation 
        className={`navigation__button-navigation ${ pathname === "/saved-movies" && "navigation__button-navigation_active" }`}
        buttonTitle="Сохранённые фильмы" 
        onClick={ onSavedMovies } 
        />
        <ButtonProfile 
        className="navigation__button-profile" 
        pathname={ pathname } 
        onClick={ handleClick } 
        />
      </section>
    )
  }
    else {
      return (<NavigationPopup
              pathname={pathname}
              onMovies={onMovies}
              onSavedMovies={onSavedMovies}
              onProfile={onProfile}
              onLogo={onLogo}
              setIsPopupOpen={setIsPopupOpen}
              />)
    }    
  }
