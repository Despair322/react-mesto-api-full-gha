import { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup({ isOpened, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }


    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            submitText='Сохранить'
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input type="url" name="avatarLink" className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку" required ref={avatarRef} />
            <p className="popup__error" id="avatarLink-error"></p>

        </PopupWithForm>
    )
}
