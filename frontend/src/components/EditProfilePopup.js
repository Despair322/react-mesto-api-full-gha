import { useContext, useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpened, onClose, onUpdateUser }) {
    const [profile, setProfile] = useState({ name: '', about: '' })

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setProfile({ ...currentUser });
    }, [currentUser, isOpened]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            ...profile
        });
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setProfile({
            ...profile,
            [name]: value
        });
    }

    return (
        <PopupWithForm
            name='name'
            title='Редактировать профиль'
            submitText='Сохранить'
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="text"
                name="name"
                className="popup__input popup__input_type_name"
                placeholder="Имя" minLength="2"
                maxLength="20"
                required
                onChange={handleChange}
                value={profile.name || ''} />
            <p className="popup__error" id="name-error"></p>
            <input type="text"
                name="about"
                className="popup__input popup__input_type_profession"
                placeholder="Профессия"
                minLength="2"
                maxLength="200"
                required
                onChange={handleChange}
                value={profile.about || ''} />
            <p className="popup__error" id="profession-error"></p>
        </PopupWithForm>
    )
}
