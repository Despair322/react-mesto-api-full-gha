import { setToken } from "./Token";
// require('dotenv').config();
const { REACT_APP_API_URL = 'http://e-dymov.nomoredomainsmonster.ru/api' } = process.env;

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject({ error: err, status: res.status }))
}

export const register = ({ password, email }) => {
    return fetch(`${REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password, email })
    })
        .then(res => checkResponse(res))
};

export const authorize = ({ email, password }) => {
    return fetch(`${REACT_APP_API_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(res => checkResponse(res))
        .then((data) => {
            console.log(data);
            if (data.token) {
                setToken(data.token);
                return data.token;
            }
            else {
                return null;
            }
        })
};

export const logout = () => {
    return fetch(`${REACT_APP_API_URL}/logout`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(res => checkResponse(res))
}

export const checkToken = () => {
    return fetch(`${REACT_APP_API_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(res => checkResponse(res))
};