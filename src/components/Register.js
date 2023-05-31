import * as React from 'react';
import AuthForm from './AuthForm';

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

    props.register(email, password);

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h2 className="popup__title popup__title_login">Регистрация</h2>
      <AuthForm
      onSubmit={ handleSubmit }
      onEmailChange={ handleEmailChange }
      emailValue={ email }
      passwordValue={ password }
      onPasswordChange={ handlePasswordChange }
      buttonText="Зарегистрироваться"
      children={ <p onClick={ props.onCaptionButtonClick } className="popup__caption popup__caption_login">Уже зарегистрированы? Войти</p> } />
    </>
  )
}

export default Register;