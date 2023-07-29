import React, { useContext } from 'react';
import vector from '../images/Vector.svg';
import plus from '../images/Plus.svg';
import Card from './Card';
import CurrentUserContext from '../context/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const {
    handleEditAvatar,
    handleEditProfile,
    handleAddPlace,
    handleCardClick,
    cards,
    onCardDelete,
    onCardLike,
  } = props;

  return (
    <main>
      <section className="profile content">
        <div className="profile__list">
          <div className="profile__image-wrapper">
            <img src={currentUser.avatar} alt="Аватар" className="profile__image" />
            <button aria-label="edit" className="button button_edit-avatar" onClick={handleEditAvatar}>
              <img src={vector} alt="Изменить" className="button__image button__image_edit-avatar" />
            </button>
          </div>
          <div className="profile__description">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
            <button aria-label="edit" className="button button_edit cursor" onClick={handleEditProfile}>
              <img src={vector} alt="Изменить" className="button__image button__image_edit" />
            </button>
          </div>
        </div>
        <button aria-label="add" className="button button_add cursor" onClick={handleAddPlace}>
          <img src={plus} alt="Добавить" className="button__image button__image_add" />
        </button>
      </section>

      { <section className="elements content" aria-label="Фото">
        {
          cards.map((card) => {
            return <Card
              key={card._id}
              card={card}
              link={card.link}
              name={card.name}
              likes={card.likes.length}
              onCardClick={handleCardClick}
              onCardDelete ={onCardDelete}
              onCardLike={onCardLike}
            />
          })
        }
      </section> }
    </main>
  );
}

export default Main;
