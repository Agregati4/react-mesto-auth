function AuthForm(props) {
  return (
    <form className="popup__form" onSubmit={ props.onSubmit }>
      <input
        placeholder="Email"
        className="popup__input popup__input_login"
        type="email"
        onChange={ props.onEmailChange }
        value={ props.emailValue }
        required
      />
      <input
        placeholder="Пароль"
        className="popup__input popup__input_login"
        type="password"
        onChange={ props.onPasswordChange }
        value={ props.passwordValue }
        required
      />
      <button className="popup__button popup__button_type_login">{ props.buttonText }</button>
      { props.children }
    </form>
  )
}

export default AuthForm;