import * as React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-link" onClick={ props.onEditAvatar }><img
          src={ currentUser.avatar }
          alt="Изображение человека"
          className="profile__image"
        /></div>
        <div className="profile__info">
          <h1 className="profile__text profile__text_type_name">{ currentUser.name }</h1>
          <button type="button" className="profile__edit-button" onClick={ props.onEditProfile }></button>
          <p className="profile__text profile__text_type_activity">{ currentUser.about }</p>
        </div>
          <button type="button" className="profile__add-button" onClick={ props.onAddPlace }></button>
        </section>
      <section className="photo-grid">{
        props.cards.map(card => (
          <Card
            data={ card }
            key={ card._id }
            onCardClick={ props.onCardClick }
            onCardLike={ props.onCardLike }
            onCardDelete={ props.onCardDelete }
          />))
        }
      </section>
    </main>
  );
};

export default Main;