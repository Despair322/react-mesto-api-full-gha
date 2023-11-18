import { Link, Route, Routes } from 'react-router-dom';
import logo from '../images/logo.svg'
export default function Header({ email, onExit }) {
    return (
        <header className="header">
            <img src={logo} alt="логотип Место" className="header__logo" />
            <div className='header__container'>
                <Routes>
                    <Route path='/' element={<><p className='header__email'>{email}</p> <button className='header__button' onClick={onExit}>Выйти</button></>} />
                    <Route path="/sign-in" element={<Link to="/sign-up" className='header__button'>Регистрация</Link>} />
                    <Route path="/sign-up" element={<Link className='header__button' to="/sign-in">Вход</Link>} />
                </Routes>
            </div>

        </header>);
}