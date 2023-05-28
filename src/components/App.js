import * as React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';

function App() {
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState({ link: null });
  const [ currentUser, setCurrentUser ] = React.useState({name: '', about: ''});
  const [ cards, setCards ] = React.useState([]);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link;
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api.getUserInfo()
    .then(userInfo => {
      setCurrentUser(userInfo);
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });

    api.getInitialCards()
    .then(cardsInfo => {
      setCards(cardsInfo);
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });
  }, [])

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  // Обработка клика по кнопке изменения профиля(Main)
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  // Обработка клика по кнопке добавления новой карточки(Main)
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  // Обработка клика по аватару пользователя(Main)
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  // Обработка клика по картинке на карточке(Main/Card)
  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard({ link: null });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки

    // Удаление карточки
    if(isLiked) {
      api.decreaseLikesQuantity(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
      });
    };

    // Добавление карточки
    api.increaseLikesQuantity(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    });
  };

  function handleUpdateUser({name, activity}) {
    setIsLoading(true);

    api.saveNewUserInfo({name, activity})
    .then(newUserInfo => {
      setCurrentUser(newUserInfo);

      closeAllPopups();
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => {
        return state.filter(c => !(c._id === card._id))
      });
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    })
  };

  function handleUpdateAvatar(link) {
    setIsLoading(true);

    api.updateProfileImage(link)
    .then(newUserInfo => {
      setCurrentUser(newUserInfo);

      closeAllPopups();
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    })
    .finally(() => {
      setIsLoading(false);
    })
  };

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);

    api.saveNewCardInfo(data)
    .then(newCard => {
      setCards([newCard, ...cards]);

      closeAllPopups();
    })
    .catch((err) => {
      alert(`Ошибка при запросе данных с сервера: ${err.name} - ${err.message}`);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } onUpdateUser={ handleUpdateUser } isLoading={ isLoading } />
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } onAddPlace={ handleAddPlaceSubmit } isLoading={ isLoading } />
          <PopupWithForm title="Вы уверены?" name="delete" buttonText="Да" />
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } onUpdateAvatar={ handleUpdateAvatar } isLoading={ isLoading } />
          <ImagePopup card={ selectedCard } onClose={ closeAllPopups } />
          <Routes>
            <Route path="/sign-in" element={ <Login loggedIn={ loggedIn } /> } />
            <Route path="/sign-up" element={ <Register loggedIn={ loggedIn } /> } />
            <Route path="/" element={ <ProtectedRoute loggedIn={ loggedIn } element={
            <Main
              cards={ cards }
              onEditProfile={ handleEditProfileClick }
              onAddPlace={ handleAddPlaceClick }
              onEditAvatar={ handleEditAvatarClick }
              onCardClick={ handleCardClick }
              onCardLike={ handleCardLike }
              onCardDelete={ handleCardDelete }/> } />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
