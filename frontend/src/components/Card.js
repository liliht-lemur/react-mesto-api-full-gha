import React, { useContext } from 'react';
import CurrentUserContext from '../context/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.includes(currentUser._id);
  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );

  function handleClick() {
    props.onCardClick(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  return (
    <div className="element">
      <img className="element__photo cursor" title="Увеличить фото" src={props.link} alt={props.name} onClick={handleClick} />
      {isOwn && <button aria-label="trash" className="element__delete cursor" type="button" onClick={handleDeleteClick} />}
      <div className="element__name">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__grade">
          <button aria-label="like" className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.likes}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;


