import close from '../images/Close_Icon.svg';


function ImagePopup(props) {
  return (
    <aside className="modal">
      <div className={`modal__overlay modal__overlay_${props.name} ${props.card ? `modal__overlay_active`: ""}`}>
        <div className="modal__form modal__form_img">
          <button aria-label="close" className="modal__close cursor" type="button"><img className="modal__image" src={close} alt="Закрыть" onClick={props.onClose} title="Закрыть" /></button>
          <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} className="modal__photo" />
          <h6 className="modal__title modal__title_img">{props.card ? props.card.name : ''}</h6>
        </div>
      </div>
    </aside>
  )
}

export default ImagePopup;