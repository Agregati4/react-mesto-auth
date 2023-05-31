import PopupWithForm from './PopupWithForm.js';
import * as React from 'react';

function AddPlacePopup(props) {
  const [text, setText] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setText('');
    setLink('');
  }, [props.isOpen])

  function handleTextChange(e) {
    setText(e.target.value);
  };

  function handlelinkChange(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({title: text, picture: link});
  }

  return (
    <PopupWithForm onSubmit={ handleSubmit } isOpen={ props.isOpen } onClose={ props.onClose } title="Новое место" name="card" buttonText={ props.isLoading ? "Сохранение..." : "Создать"} children={
      <>
        <input
          name="title"
          className="popup__input"
          id="card-popup__input_type_title"
          type="text"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          value={ text }
          onChange={ handleTextChange }
          required
        />
        <span className="popup__error title-error"></span>
        <input
          name="picture"
          className="popup__input"
          id="card-popup__input_type_picture"
          type="url"
          placeholder="Ссылка на картинку"
          value={ link }
          onChange={ handlelinkChange }
          required
        />
        <span className="popup__error picture-error"></span>
      </>
    } />
  )
}

export default AddPlacePopup;