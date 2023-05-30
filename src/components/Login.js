import * as React from 'react';
import { authorization } from './Auth.js';

function Login(props) {
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

    authorization(email, password)
    .then(data => props.success(data, email))
    .catch(() => {
      props.error();

      setEmail('');
      setPassword('');
    })
  };

  return (
    <>
      <h2 className="popup__title popup__title_login">Вход</h2>
      <form className="popup__form" onSubmit={ handleSubmit }>
        <input
          placeholder="Email"
          className="popup__input popup__input_login"
          type="email"
          onChange={ handleEmailChange }
          value={ email }
          required
        />
        <input
          placeholder="Пароль"
          className="popup__input popup__input_login"
          type="password"
          onChange={ handlePasswordChange }
          value={ password }
          required
        />
        <button className="popup__button popup__button_type_login">Войти</button>
      </form>
    </>
  )
}

export default Login;