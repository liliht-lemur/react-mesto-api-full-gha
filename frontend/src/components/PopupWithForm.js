import close from '../images/Close_Icon.svg';

function PopupWithForm(props) {
  return (
    <aside className="modal">
      <div className={`modal__overlay modal__overlay_${props.name} ${props.isOpen ? `modal__overlay_active`: ""}`}>
        <div className="modal__form">
          <button aria-label="close" className="modal__close cursor" type="button"><img className="modal__image" src={close} alt="Закрыть" onClick={props.onClose} title="Закрыть" /></button>
          <h2 className="modal__title">{props.title}</h2>
          <form className="modal__property" name={props.form} action="#" onSubmit={props.onSubmit}>
            {props.children}
            <button aria-label="save" className="button button_submit cursor button_submit-edit" type="submit" title="Сохранить">{ props.buttonText }</button>
          </form>
        </div>
      </div>
    </aside>
  )
}

export default PopupWithForm;