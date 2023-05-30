import logo from '../images/logo.svg';

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      {props.loggedIn && <p className="header__email">{ props.email }</p> }
      <button onClick={ props.onButtonClick } className="header__button">{ props.buttonText }</button>
    </header>
  )
}

export default Header;