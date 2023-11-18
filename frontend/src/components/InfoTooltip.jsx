import React from 'react'

export default function InfoTooltip({ isOpened, isConfirm, onClose }) {
    return (
        <div className={`popup ${isOpened ? 'popup_opened' : null}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <div className={`popup__image popup__image_${isConfirm ? 'accepted' : 'rejected'}`} />
                <h2 className="popup__message">
                    {isConfirm ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h2>

            </div>
        </div>
    )
}
