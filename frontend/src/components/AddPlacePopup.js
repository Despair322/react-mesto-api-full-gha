import { useEffect, useState } from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpened, onClose, onAddCard }) {
    const [place, setPlace] = useState({ name: '', link: '' });

    function handleSubmit(e) {
        e.preventDefault();
        onAddCard({
            ...place
        })
    }

    useEffect(() => {
        setPlace({ name: '', link: '' })
    }, [isOpened])

    function handleChange(e) {
        const { name, value } = e.target;
        setPlace({
            ...place,
            [name]: value
        });
    }

    return (
        <PopupWithForm
            name='card'
            title='Новое место'
            submitText='Создать'
            isOpened={isOpened}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <input type="text"
                name="name"
                className="popup__input popup__input_type_title"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChange}
                value={place.name} />
            <p className="popup__error" id="title-error"></p>
            <input type="url"
                name="link"
                className="popup__input popup__input_type_link"
                placeholder="Ссылка на картинку"
                required
                onChange={handleChange}
                value={place.link} />
            <p className="popup__error" id="link-error"></p>
        </PopupWithForm>
    )
}
