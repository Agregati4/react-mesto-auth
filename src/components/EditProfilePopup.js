import PopupWithForm from './PopupWithForm.js';
import * as React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
  const [ name, setName ] = React.useState('');
  const [ activity, setActivity ] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setActivity(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({ name: name, activity: activity });
  };
  
  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handleActivityChange(e) {
    setActivity(e.target.value);
  };

  return (
    <PopupWithForm onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } name="profile" title="Редактировать профиль" buttonText={ props.isLoading ? "Сохранение..." : "Сохранить"} children={
      <>
        <input
          name="name"
          className="popup__input"
          id="popup__input_type_name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={ name }
          onChange={ handleNameChange }
          required
        />
        <span className="popup__error name-error"></span>
        <input
          name="activity"
          className="popup__input"
          id="popup__input_type_activity"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={ activity }
          onChange={ handleActivityChange }
          required
        />
        <span className="popup__error activity-error"></span>
      </>
    } />
  )
}

export default EditProfilePopup;