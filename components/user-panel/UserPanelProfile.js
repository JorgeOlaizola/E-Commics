import Link from 'next/link';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'
import { loginWithGitHub } from '../../firebase/client'
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

const UserPanelProfile = () => {
    const userData = useSelector(state => state.user.userData);

    const handleGitHubLink = async () => {
        loginWithGitHub()
        .then(r => axios.put('/api/users/github', {userId: userData.user.id, githubEmail: r.user.email}))
        .then(r => console.log(r.data))
    }

    return (
        <StyledContainer>
            <DataSection>
                <DataColumn>
                    <h3>Imagen de perfil</h3>
                    <ProfileImg src={userData.user.avatar || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} />
                </DataColumn>
                <DataColumn>
                    <h3>Datos personales</h3>
                    <DataText><strong>Nombre:</strong> {userData.user.name}</DataText>
                    <DataText><strong>Apellido:</strong> {userData.user.surname}</DataText>
                    <DataText><strong>Email:</strong> {userData.user.email}</DataText>
                    <DataText><strong>Usuario:</strong> {userData.user.nickname}</DataText>
                    <GradientBorder>
                        <button onClick={() => handleGitHubLink()}>Vincular con GitHub</button>
                    </GradientBorder>
                    <span>¿Hubo un  error en la carga de tu nombre o apellido? <a href="/help/contact" style={{color: "#0096FF"}}>Escríbenos</a></span>
                </DataColumn>
            </DataSection>
        </StyledContainer>
    )
}

export default UserPanelProfile;