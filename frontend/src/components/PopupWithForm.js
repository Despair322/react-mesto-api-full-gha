export default function PopupWithForm({ name, title, submitText, children, isOpened, onClose, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpened ? 'popup_opened' : null}`}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form action="#" className="popup__form" name={`${name}-form`} noValidate onSubmit={onSubmit}>
                    {children}
                    <button type="submit" className="popup__submit">{submitText}</button>
                </form>
            </div>
        </div>
    )
}
