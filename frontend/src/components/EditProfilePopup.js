import CurrentUserContext from '../context/CurrentUserContext';
import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [props.isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault()
    props.onUpdateUser({
      name: name,
      about: description
    })
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      form={'profileData'}
      title={'Редактировать профиль'}
      name={'edit'}
      buttonText='Сохранить'
    >

      <div className="modal__input">
        <input id="name-input" className="modal__description modal__description_type_name" name="name" type="text" placeholder="Ваше имя" required minLength="2" maxLength="40" value={name} onChange={handleNameChange} />
        <span className="name-input-error modal__description-error"></span>
      </div>
      <div className="modal__input">
        <input id="about-self" className="modal__description modal__description_type_about-self" name="about-self"
          type="text" placeholder="Род занятий" required minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} />
        <span className="about-self-error modal__description-error"></span>
      </div>
    </PopupWithForm>
  )
}


export default EditProfilePopup;