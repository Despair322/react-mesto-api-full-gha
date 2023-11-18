import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    // console.log(currentUser);


    return (
        <main className="content">
            <section className="profile" aria-label="Профиль">
                <div className="profile__photo-container">
                    <img src={currentUser.avatar} alt="Фото профиля" className="profile__photo" />
                    <div className="profile__photo-overlay"></div>
                    <button type="button" className="profile__edit-photo" onClick={onEditAvatar}>
                    </button>
                </div>
                <div className="profile__name-container">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button type="button" className="profile__edit-name" onClick={onEditProfile}></button>
                </div>
                <p className="profile__profession">{currentUser.about}</p>
                <button className="profile__add" type="button" onClick={onAddPlace}></button>
            </section>

            <section className="gallery" aria-label="Галерея">
                {cards.map((card) => (<Card
                    key={card._id}
                    card={card}
                    onCardClick={onCardClick}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                />))}
            </section>


        </main>


    );
}