import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    // console.log(children)
    let auth = {'token': localStorage.getItem('authorizationToken')}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )


};

export default ProtectedRoute;