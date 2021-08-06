import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import styled from "styled-components";
import {
    Input,
    GradientBorder,
    DisableBorder,
    InputDisable,
    EraseButton,
  } from "../globalStyle";

const DivContainer = styled.div`

  padding: 1rem;

`;

const NewsList = styled.div`
display: block;
flex-direction: column;
max-width: 480px;
justify-content: flex-start;
align-items: flex-start;
${'' /* flex-wrap: wrap; */}
margin: 8px 16px;
`

const UsersButtonDelete = styled(EraseButton)`
margin: 8px 16px 16px 0px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.redColorHover};
    }
`

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
        .then(r => {
            getUsers()
            alert(r.data.success_msg)})
        .catch(err => alert(err))
    }

    return (
        <>
        <h2>Usuarios</h2>
        <div>
            
            <NewsList>
                <form>
                    <label style={{fontFamily: "ubuntu", color: "#00A0FF"}}>Buscar usuario por nickname: </label>
                    <input styled={{width: "200px", flexGrow: "4"}} name="user" placeholder="" onChange={(e) => getUsers(e.target.value)}></input>
                </form>
            </NewsList>
                { users && users.length ? users.map(u => 
                <NewsList key={u.id}>
                <p><strong>Nickname:</strong> {u.nickname} </p>
                <p> <strong>Email:</strong> {u.email} </p>
                <p><strong>Rol:</strong> {u.role}</p> 
                <p><strong>ID:</strong> {u.id} </p>
                <p><strong>Status:</strong> {u.status}</p>
                <div>
                    {u.role !== 'user' && <UsersButton onClick={() => changeRole('user', u.id)}>Rol: usuario</UsersButton>}
                    {u.role !== 'officialstore' && <UsersButton onClick={() => changeRole('officialstore', u.id)}>Rol: tienda oficial</UsersButton>}
                    {u.role !== 'admin' && <UsersButton onClick={() => changeRole('admin', u.id)}>Rol: admin</UsersButton>}
                    {u.role !== 'admin' && u.status !== 'banned' && <UsersButtonDelete onClick={() => BanOrUnBanUser(u.id, 'banned')}>Deshabilitar usuario</UsersButtonDelete>}
                    {u.role !== 'admin' && u.status === 'banned' && <UsersButton onClick={() => BanOrUnBanUser(u.id, 'active')}>Habilitar usuario</UsersButton>}
                    <UsersButton>Editar usuario</UsersButton>
                </div>
                </NewsList>) 
                : <p>No hay usuarios</p>}
        </div>
        </>
    )
}

export default Users;

const UsersButton = styled(EraseButton)`
margin: 8px 16px 16px 0px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.blueColorHover};
    }
`