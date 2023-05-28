function ImagePopup(props) {
  return (
    <div id="picture-popup" className={ `popup ${props.card.link && "popup_opened"}` }>
      <figure className="popup__figure">
        <button className="popup__cross popup__cross_picture" onClick={ props.onClose }></button>
        <img id="picture-popup__image" className="popup__image" alt={ props.card.name } src={ props.card.link } />
        <figcaption id="picture-popup__caption" className="popup__caption">{ props.card.name }</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;