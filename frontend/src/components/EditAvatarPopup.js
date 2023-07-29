import React, { useRef, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const ref = useRef();

  useEffect(() => {
    ref.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onSubmit({
      avatar: ref.current.value
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      form={'placeData'}
      title={'Обновить аватар'}
      name={'avatar'}
      buttonText='Сохранить'
    >

      <div className="modal__input">
        <input ref={ref} id="link-input-avatar" className="modal__description modal__description_type_link" placeholder="Ссылка на картинку" name="link"
          required type="URL" />
        <span className="link-input-avatar-error modal__description-error"></span>
      </div>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;