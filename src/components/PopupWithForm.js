function PopupWithForm({ name, isOpen, onClose, title, children, buttonText, onSubmit, }) {
  return (
    <div id={`${name}-popup`} className={`popup ${isOpen && "popup_opened"}`}>
      <button id="popup__cross" type="button" className="popup__cross" onClick={ onClose } />
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form id={`${name}-popup-form`} name={`${name}-popup__form`} className="popup__form" onSubmit={ onSubmit }>
          {children}
          <button id={`${name}-popup__button`} type="submit" className="popup__button">{buttonText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;