import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'
import { loginWithGitHub, onCloseSession } from '../../firebase/client'
import axios from 'axios'


const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DataSection = styled.div`
    width: 60%;
    display: flex;
    margin: 20px 0;
    border-style: solid;
    border-width: 1px;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
`


const DataColumn = styled.div`
    width: 250px;
    margin: 10px;
`

const DataText = styled.p`
    ${'' /* font-size: 1rem; */}
    ${'' /* color: #000; */}
    ${'' /* margin: 2.5px 0; */}
    ${'' /* line-height: 150%; */}
`

const StyledButton = styled.button`
    width: 200px;
    margin-top: 5px;

`

const ProfileImg = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
`

const ErrorConteiner = styled.div`
width: 70%;
color: white;
height: 3rem;
background-color: rgb(230, 48, 51);
border: 1px solid red;
display: flex;
justify-content: center;
align-items: center;
position: relative;
`
const SucessConteiner = styled.div`
width: 70%;
color: white;
height: 3rem;
background-color: rgb(55, 189, 91);
border: 1px solid green;
display: flex;
justify-content: center;
align-items: center;
position: relative;
`

const DeleteButton = styled.button`
border: none;
margin: none;
padding: none;
background: none;
position: absolute;
right: 1rem;
color: white;
`

const GithubButton = styled.button`
width: 90%;
height: 2rem;
background-color: black;
color: white;
border: 0.5px solid black;
margin: 20px 0;
padding: 2px;
`

const UserPanelProfile = () => {
    const userData = useSelector(state => state.user.userData);

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleGitHubLink = async () => {
        loginWithGitHub()
        .then(r => { console.log(r.user)
            return axios.put('/api/users/github', {userId: userData.user.id, githubID: r.user.uid}).catch(err => console.log(err))
        })
        .then(r => {
            if(r.data.error_msg){
                setError(r.data.error_msg)
                setSuccess('')
            }
            else if(r.data.success_msg){
                setSuccess(r.data.success_msg)
                setError('')
            }
        })
        onCloseSession().then(r => console.log(r)).catch(err=> console.log(err))
    }

    const deleteMsg = (msg) => {
        msg === 'error' ? setError('') : setSuccess('')
    }

    return (
        <StyledContainer>
            {error && <ErrorConteiner>
                {error} <DeleteButton onClick={() => deleteMsg('error')}>X</DeleteButton>
            </ErrorConteiner>}
            {success && 
            <SucessConteiner>
                { success } <DeleteButton onClick={() => deleteMsg('success')}>X</DeleteButton>
            </SucessConteiner>}
            <DataSection>
                <DataColumn>
                    <h3>Imagen de perfil</h3>
                    <ProfileImg src={userData.user.avatar} />
                </DataColumn>
                <DataColumn>
                    <h3>Datos personales</h3>
                    <DataText><strong>Nombre:</strong> {userData.user.name}</DataText>
                    <DataText><strong>Apellido:</strong> {userData.user.surname}</DataText>
                    <DataText><strong>Email:</strong> {userData.user.email}</DataText>
                    <DataText><strong>Usuario:</strong> {userData.user.nickname}</DataText>
                        { userData.user.github === 'None' ? <GithubButton onClick={() => handleGitHubLink()}>Vincular con GitHub</GithubButton> : <span>Ya estás vinculado a una cuenta de GitHub<hr/></span>}
                    <span>¿Hubo un  error en la carga de tu nombre o apellido? <Link href="/help/contact" style={{color: "#0096FF"}}>Escríbenos</Link></span>
                </DataColumn>
            </DataSection>
        </StyledContainer>
    )
}

export default UserPanelProfile;
