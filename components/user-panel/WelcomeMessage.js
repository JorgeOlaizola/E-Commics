import React from 'react'
import { useSelector } from 'react-redux';


function WelcomeMessage() {
    const userData = useSelector(state => state.user.userData)

    return (
        <>
            {userData.user.nickname? <h1>¡Hola  {userData.user.nickname} !</h1>: <h1>Quién eres?</h1>}
        </>
    )
}

export default WelcomeMessage;