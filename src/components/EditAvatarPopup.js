import PopupWithForm from './PopupWithForm.js';
import * as React from 'react';

function EditAvatarPopup(props) {
  const inputRef = React.useRef('');

  React.useEffect(() => {
    inputRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(inputRef.current.value);
  };

  return (
    <PopupWithForm onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } title="Обновить аватар" name="profile-image" buttonText={ props.isLoading ? "Сохранение..." : "Сохранить"} children={
      <>
        <input
          name="link"
          className="popup__input"
          id="profile-image-popup__input_type_title"
          type="url"
          placeholder="Ссылка на картинку"
          ref={ inputRef }
          required
        />
        <span className="popup__error link-error"></span>
      </>
    }/>
  )
}

export default EditAvatarPopup;