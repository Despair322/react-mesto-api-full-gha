import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from 'react';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import * as authApi from '../utils/ApiAuth';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
  const [IsSuccessInfoTooltipStatus, setIsSuccessInfoTooltipStatus] = useState(false);

  const [cards, setCards] = useState([]);

  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      api.getCards()
        .then(cards => {
          setCards(cards.toReversed())
        })
        .catch(err => { console.log(err); })

      api.getUserInfo()
        .then(info => {
          console.log(info);
          setCurrentUser(info);
        })
        .catch(err => { console.log(err) })
    }
  }, [loggedIn])

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
      authApi.checkToken()
        .then(data => {
          setEmail(data.email);
          setLoggedIn(true)
        })
        .catch(err => {
          console.log(err);
          setLoggedIn(false)
        })
    
  }, [])


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const closeAllPopups = () => {
    [setIsAddPlacePopupOpen, setIsEditAvatarPopupOpen, setIsEditProfilePopupOpen, setIsInfoTooltipOpen].forEach(func => { func(false) })
    setSelectedCard({ name: '', link: '' })
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => { console.log(err); })
  }

  function handleUpdateAvatar(avatar) {
    api.updateAvatar(avatar)
      .then(info => {
        setCurrentUser(info);
        closeAllPopups();
      })
      .catch(err => { console.log(err); })
  }

  function handleCardClick({ link, name }) {
    setSelectedCard({ link, name });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);
    api.changeLIkeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => { console.log(err); });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(c => {
        setCards((state) => state.filter(c => c._id !== card._id));
      })
      .catch(err => { console.log(err); })
  }

  function handleAddCard(card) {
    return api.createCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      })
  }

  async function handleLogin(dataLogin) {
    authApi.authorize(dataLogin)
      .then(res => {
        setEmail(dataLogin.email);
        setLoggedIn(true)
      })
      .catch(err => {
        console.log(err)
      });
  }
  async function handleRegister(dataRegister) {
    await authApi.register(dataRegister)
      .then(res => {
        setIsSuccessInfoTooltipStatus(true);
      })
      .catch(err => {
        setIsSuccessInfoTooltipStatus(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleExit() {
    authApi.logout()
      .then(() => {
        setEmail('');
        setLoggedIn(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='body'>
        <div className="page">
          <Header email={email} onExit={handleExit} />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>} />
            <Route path="/sign-in" element={
              <ProtectedRoute loggedIn={loggedIn} onlyUnAuth>
                <Login onLogin={handleLogin} />
              </ProtectedRoute>}
            />
            <Route path="/sign-up" element={
              <ProtectedRoute loggedIn={loggedIn} onlyUnAuth>
                <Register onRegister={handleRegister} />
              </ProtectedRoute>}
            />
            <Route path="*" element={
              loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
            } />
          </Routes>

          <InfoTooltip
            isOpened={isInfoTooltipOpen}
            isConfirm={IsSuccessInfoTooltipStatus}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpened={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpened={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpened={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddCard}
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
