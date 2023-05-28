import * as React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.data.owner._id === currentUser._id;
  const isLiked = props.data.likes.some(like => like._id === currentUser._id);
  const cardLikeButtonClassName = (`photo-grid__heart ${isLiked && "photo-grid__heart_active"}`);

  function handleClick() {
    props.onCardClick( props.data );
  };

  function handleLikeClick() {
    props.onCardLike( props.data );
  };

  function handleDeleteClick() {
    props.onCardDelete( props.data )
  }

  return (
    <div className="photo-grid__card">
      { isOwn && <button className="photo-grid__trash" onClick={ handleDeleteClick }></button> }
      <img
        className="photo-grid__image"
        src={ props.data.link }
        alt={ props.data.name }
        onClick={ handleClick }
      />
      <div className="photo-grid__card-caption">
        <h2 className="photo-grid__card-title">{ props.data.name }</h2>
        <div className="photo-grid__likes">
          <button type="button" className={ cardLikeButtonClassName } onClick={ handleLikeClick }></button>
          <p className="photo-grid__hearts-quantity">{ props.data.likes.length }</p>
        </div>
      </div>
    </div>
  )
}

export default Card;