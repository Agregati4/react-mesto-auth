import * as React from 'react';
import AuthForm from './AuthForm';

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

    props.authorization(email, password);

    setEmail('');
    setPassword('');
  };

  return (
    <>
      <h2 className="popup__title popup__title_login">Вход</h2>
      <AuthForm onSubmit={ handleSubmit } onEmailChange={ handleEmailChange } emailValue={ email } passwordValue={ password } onPasswordChange={ handlePasswordChange } buttonText="Войти" />
    </>
  )
}

export default Login;