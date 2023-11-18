import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    function handleClick() {
        onCardClick(card);
    }

    function handleLike() {
        onCardLike(card)
    }

    function handleDelete() {
        onCardDelete(card)
    }
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(like => {
        return like === currentUser._id
    });
    return (
        <div className="photo-card">
            <img className="photo-card__photo" src={card.link} onClick={handleClick} alt={card.name} />
            <h3 className="photo-card__title">{card.name}{isOwn}</h3>
            <div className="photo-card__like-container">
                <button type="button" className={`photo-card__like ${isLiked ? "photo-card__like_active" : ""}`} onClick={handleLike}></button>
                <span className="photo-card__like-counter">{card.likes.length}</span>
            </div>
            <button type="button"
                className={`photo-card__delete ${!isOwn ? "photo-card__delete_hidden" : ""}`}
                onClick={handleDelete}>
            </button>
        </div>
    )
}
