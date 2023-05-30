import * as React from 'react';
import { register } from './Auth.js';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    register(email, password)
    .then(() => props.success())
    .catch(() => {
      props.error();

      setEmail('');
      setPassword('');
    })
  };

  return (
    <>
      <h2 className="popup__title popup__title_login">Регистрация</h2>
      <form className="popup__form" onSubmit={ handleSubmit }>
        <input
          placeholder="Email"
          className="popup__input popup__input_login"
          type="email"
          value={ email }
          onChange={ handleEmailChange }
          required
        />
        <input
          placeholder="Пароль"
          className="popup__input popup__input_login"
          type="password"
          value={ password }
          onChange={ handlePasswordChange }
          required
        />
        <button type="submit" className="popup__button popup__button_type_register">Зарегистрироваться</button>
        <p className="popup__caption popup__caption_login">Уже зарегистрированы? Войти</p>
      </form>
    </>
  )
}

export default Register;