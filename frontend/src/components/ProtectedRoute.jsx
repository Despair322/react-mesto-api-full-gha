import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ onlyUnAuth, loggedIn, children }) {
    if (onlyUnAuth && loggedIn) {
        return <Navigate to={{ pathname: '/' }} />
    }
    if (!onlyUnAuth && !loggedIn) {
        return <Navigate to={{ pathname: '/sign-in' }} />
    }
    return children;
}
