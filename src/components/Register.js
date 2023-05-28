import * as React from 'react';
import checkMark from '../images/checkMark.svg';
import Header from './Header.js';
import { useNavigate } from 'react-router-dom';
import { register } from './Auth.js';

function Register(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();

    register(email, password)
    .then(res => console.log(res));
  };

  function handleButtonClick() {
    navigate('/sign-in');
  };

  return (
    <>
      <Header loggedIn={ props.loggedIn } buttonText="Войти" onButtonClick={ handleButtonClick } />
      <div className="login login_type_register">
        <h2 className="login__title">Регистрация</h2>
        <form className="login__form" onSubmit={ handleSubmit }>
          <input
            placeholder="Email"
            className="login__input"
            type="email"
            value={ email }
            onChange={ handleEmailChange }
            required
          />
          <input
            placeholder="Пароль"
            className="login__input"
            type="password"
            value={ password }
            onChange={ handlePasswordChange }
            required
          />
          <button type="submit" className="login__button">Зарегистрироваться</button>
          <p className="login__button-caption">Уже зарегистрированы? Войти</p>
        </form>
      </div>
    </>
  )
}

export default Register;