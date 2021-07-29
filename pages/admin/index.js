import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
    isAdmin 
} from '../../store/actions/adminActions'
import {
    getUserData
} from '../../store/actions/normalUsersActions'
import axios from 'axios'


const Admin = () => {

    const disptach = useDispatch()
    const userData = useSelector(state => state.user.userData.user);

    // useEffect(() => {
    //     getUserData()
    //     isAdmin(userData.id)
    // }, [])

    return (
        <div>
            Este es el panel de administrador. Aquí se ejecutarán todas las acciones posibles de administrador.
        </div>
    )
}

export default Admin