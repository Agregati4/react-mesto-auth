import * as React from 'react';
import error from '../images/error.svg';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  function handleNameChange(e) {
    setName(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
  };

  function handleButtonClick() {
    navigate('/sign-up');
  };

  return (
    <>
      <Header loggedIn={ props.loggedIn } buttonText="Регистрация" onButtonClick={ handleButtonClick }/>
      <div className="login">
        <h2 className="login__title">Вход</h2>
        <form className="login__form" onSubmit={ handleSubmit }>
          <input
            placeholder="Email"
            className="login__input"
            type="email"
            onChange={ handleNameChange }
            value={ name }
            required
          />
          <input
            placeholder="Пароль"
            className="login__input"
            type="password"
            onChange={ handlePasswordChange }
            value={ password }
            required
          />
          <button className="login__button">Войти</button>
        </form>
      </div>
    </>
  )
}

export default Login;