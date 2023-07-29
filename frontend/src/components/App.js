import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../context/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import success from "../images/success.png";
import fail from "../images/fail.png";
import * as auth from '../utils/auth';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const [popupImage, setPopupImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const [infoTooltip, setInfoTooltip] = useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getAboutMe(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
        .then(({ data }) => {
          setUserEmail(data.email);
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltip(false);
  }
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((items) => items.filter((c) => c._id !== card._id && c));
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.includes(currentUser._id);

    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api.removeLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
  function handleUpdateUser(data) {
    api.updateAboutMe(data.name, data.about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.updateMyAvatar(data.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.createCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleInfoTooltip() {
    setInfoTooltip(true);
  }

  function handleRegister(email, password) {
    auth.registerUser(email, password)
      .then(() => {
        handleInfoTooltip();
        setPopupImage(success);
        setPopupTitle("Вы успешно зарегистрировались!");
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        handleInfoTooltip();
        setPopupImage(fail);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      })
      .finally(() => { });
  }

  function handleLogin(data) {
    auth.loginUser(data.email, data.password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        handleInfoTooltip();
        setPopupImage(fail);
        setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      })
      .finally(() => setUserEmail(data.email));
    ;
  }

  function handleLogOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={isLoggedIn}
        onLogOut={handleLogOut}
        userEmail={userEmail}
      />
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Register
              handleRegister={handleRegister}
            />}
        />
        <Route
          path="/sign-in"
          element={
            <Login
              handleLogin={handleLogin}
              onLogin={userEmail}
            />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn={isLoggedIn}
              handleEditAvatar={handleEditAvatarClick}
              handleEditProfile={handleEditProfileClick}
              handleAddPlace={handleAddPlaceClick}
              handleCardClick={handleCardClick}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
          }
        ></Route>

        <Route
          path="*"
          element={
            !isLoggedIn ? <Navigate to="/sign-in" /> : <Navigate to="/" />
          } />
      </Routes>

      <Footer />

      <InfoTooltip
        image={popupImage}
        title={popupTitle}
        isOpen={infoTooltip}
        onClose={closeAllPopups}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleAddPlaceSubmit}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleUpdateAvatar}
      />

    </CurrentUserContext.Provider>
  );

}

export default App;
