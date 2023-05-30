import checkMark from '../images/checkMark.svg';
import error from '../images/error.svg';

function InfoTooltip(props) {
  return (
    <div className={ `popup ${ props.isOpen ? "popup_opened" : ""}` }>
      <button id="popup__cross" type="button" className="popup__cross" onClick={ props.onClose }/>
      <div className="popup__container">
        <img src={ props.isSuccess ? checkMark : error } className="popup__checkMark"></img>
        <h2 className="popup__title popup__title_below">{ props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;