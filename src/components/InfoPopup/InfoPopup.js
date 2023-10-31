import { useEffect } from "react";
import ButtonBar from "../UI/Buttons/ButtonBar/ButtonBar";

export default function InfoPopup ({ isOpen, onClose, message }) {

  function handleClick(e) {
    e.preventDefault();
    onClose();
  }

  useEffect(() => {
    if (!isOpen) return;
    const handleCloseByEsc = e => e.key === 'Escape' && onClose();                
    document.addEventListener('keydown', handleCloseByEsc);               
    return () => document.removeEventListener('keydown', handleCloseByEsc) 
    }, [isOpen])

  return (
    <section className={`popup  ${isOpen ? "popup_opened" : ""}`}
             onMouseDown={onClose}>
      <div className={`popup__container`}
           onMouseDown={(e) => e.stopPropagation()}>
        <div className="popup__info">
          <h2 className="popup__title">{message}</h2>
          <ButtonBar className="popup__button-bar" onClick={ handleClick } buttonTitle="OK" isButtonActive={ true } />
        </div> 
      </div>
    </section>
  );
};