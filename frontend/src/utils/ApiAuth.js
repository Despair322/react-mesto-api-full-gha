import { setToken } from "./Token";

export const BASE_URL = 'http://localhost:3000';

function checkResponse(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject({ error: err, status: res.status }))
}

export const register = ({ password, email }) => {
    return fetch(`${BASE_URL}/signup`, {
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
    return fetch(`${BASE_URL}/signin`, {
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
    return fetch(`${BASE_URL}/logout`, {
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
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(res => checkResponse(res))
};