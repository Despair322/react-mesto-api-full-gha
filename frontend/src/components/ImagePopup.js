export default function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_shade_extra-dark ${card.link.length !== 0 ? 'popup_opened' : null}`} id="popup-photo">
            <div className="popup__photo-container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <img className="popup__photo" src={card.link} alt={card.name} />
                <p className="popup__subtitle">{card.name}</p>
            </div>
        </div>
    )
}
