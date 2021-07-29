import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const Users = () => {

    const [users, setUsers] = useState({})

    const getUsers = async (query) => {
        if(query){
            const allUsers = await axios.get(`/api/users/admin?nickname=${query}`)
            if(allUsers.error_msg){
                return
            }
            else{
                setUsers(allUsers.data)
                return
            }
        }
        else{
            const allUsers = await axios.get('/api/users/admin')
            setUsers(allUsers.data)
        }
    }

    useEffect(() => {
        getUsers()
        console.log(users)
    }
    , [])
    
    const changeRole = async (role, id) => {
        const msg = await axios.put(`/api/users/admin?role=${role}&id=${id}`)
        if(msg.data.success_msg){
            getUsers()
            alert(msg.data.success_msg)
        }
        else{
            alert(msg.data.error_msg)
        }
    }

    const BanOrUnBanUser = async (userId, status) => {
        axios.put(`/api/users/banuser`, { userId, status })
        .then(r => alert(r.data))
        .catch(err => alert(err))
    }

    return (
        <div>
            <h1>Users</h1>
                <input name="user" placeholder="Buscar un usuario por nickname" onChange={(e) => getUsers(e.target.value)}></input>
                { users && users.length ? users.map(u => 
                <p key={u.id}>Nickname: {u.nickname} - 
                Email: {u.email} - 
                Role: {u.role} - 
                ID: {u.id} -
                Status: {u.status}

                {u.role !== 'user' && <button onClick={() => changeRole('user', u.id)}>Role: user</button>}
                {u.role !== 'officialstore' && <button onClick={() => changeRole('officialstore', u.id)}>Role: officialstore</button>}
                {u.role !== 'admin' && <button onClick={() => changeRole('admin', u.id)}>Role: admin</button>}
                {u.role !== 'admin' && u.status !== 'banned' && <button onClick={() => BanOrUnBanUser(u.id, 'banned')}>Ban user</button>}
                {u.role !== 'admin' && u.status === 'banned' && <button onClick={() => BanOrUnBanUser(u.id, 'active')}>UnBan user</button>}
                <button>Editar usuario</button>
                </p>) 
                : <p>No hay usuarios</p>}
        </div>
    )
}

export default Users