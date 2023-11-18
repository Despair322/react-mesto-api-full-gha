import React, { useState } from 'react'
import AuthorizationForm from './AuthorizationForm';

export default function Login({ onLogin }) {

    const [userData, setUserData] = useState({ email: '', password: '' });

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = userData;
        if (!email || !password)
            return;
        onLogin(userData);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    }

    return (
        <AuthorizationForm
            title='Вход'
            onSubmit={handleSubmit}
            buttonText='Войти'
        >
            <input type="text"
                name="email"
                required
                className='authorization__input'
                placeholder='email'
                value={userData.email}
                onChange={handleChange} />
            <input type="password"
                name="password"
                required
                className='authorization__input'
                placeholder='пароль'
                value={userData.password}
                onChange={handleChange} />
        </AuthorizationForm>
    )
}
