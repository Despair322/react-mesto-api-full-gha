import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function AuthorizationForm({ title, buttonText, onSubmit, children }) {
  const location = useLocation();
  return (
    <div className="authorization">
      <h1 className="authorization__title">{title}</h1>
      <form className="authorization__form" action="#" name="login-form" noValidate>
        {children}
        <button type="submit" className="authorization__submit" onClick={onSubmit}>{buttonText}</button>
        {location.pathname === "/sign-up" ? <p className='authorization__text'>Уже зарегистрированы? <Link to="/sign-in" className='authorization__link'>Войти</Link></p> : null}
      </form>
    </div>
  )
}
