import React, { useState } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      name: name,
      link: link
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName('');
      setLink('');
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      form={'placeData'}
      title={'Новое место'}
      name={'add'}
      buttonText='Создать'
    >

      <div className="modal__input">
        <input id="heading-input" className="modal__description modal__description_type_heading" placeholder="Название" name="heading" type="text" minLength="2" maxLength="30" required value={name} onChange={handleNameChange} />
        <span className="heading-input-error modal__description-error"></span>
      </div>
      <div className="modal__input">
        <input id="link-input" className="modal__description modal__description_type_link" placeholder="Ссылка на картинку" name="link"
          required type="URL" value={link} onChange={handleLinkChange} />
        <span className="link-input-error modal__description-error"></span>
      </div>

    </PopupWithForm>
  )
}
export default AddPlacePopup;