import close from '../images/Close_Icon.svg';

function InfoTooltip(props) {
  return (
    <aside className="modal">
      <div className={`modal__overlay ${props.isOpen ? `modal__overlay_active` : ""}`}>
        <div className="modal__form">
          <button aria-label="close" className="modal__close cursor" type="button"><img className="modal__image" src={close} alt="Закрыть" onClick={props.onClose} title="Закрыть" /></button>
          <img className="modal__answer" src={props.image} alt={props.title} />
          <h2 className="modal__subtitle">{props.title}</h2>
        </div>
      </div>
    </aside>
  );
}

export default InfoTooltip;





// function InfoTooltip(props) {
//   return (
//     <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseClick}>
//       <div className="popup__info">
//         <img className="popup__status" src={props.image} alt={props.title} />
//         <h2 className="popup__message">{props.title}</h2>
//         <button className="popup__btn-close" type="button" title="Закрыть" onClick={props.onClose} />
//       </div>
//     </div>
//   );
// }