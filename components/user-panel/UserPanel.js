import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

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
    flex-direction: column;
    margin: 20px 0;
    border-style: solid;
    border-width: 1px;
    border-color: #000;
    padding: 5px;
`

const WelcomeMessage = styled.a`
    font-size: 2rem;
    color: #ED2024;
`

const DataRow = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const PersonalDataRow = styled.div`
    display: flex;
    justify-content: space-between;
`

const DataColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const DataTitle = styled.a`
    font-size: 1.5rem;
    color: #000;
    margin-bottom: 10px;
    display: flex;
    align-self: center;
`

const DataText = styled.a`
    font-size: 1rem;
    color: #000;
    margin: 2.5px 0;
`

const StyledButton = styled.button`
    width: 200px;
    margin-top: 5px;
    display: flex;
    align-self: center;
    justify-content: center;
`

const UserPanel = () => {

    const userData = useSelector(state => state.user.userData)

    const dispatch = useDispatch();

    useEffect(() => {
        const start = async () => {
            await dispatch(getUserData());
        }
        start();
        if(userData.log === false) {
            window.location.href = "/"
        }
    }, [])

    return (
        <StyledContainer>
            <WelcomeMessage>
                ¡Hola de nuevo, {userData.name}!
            </WelcomeMessage>
            <DataSection>
                <DataTitle>Datos personales</DataTitle>
                <PersonalDataRow>
                    <DataColumn>
                        <DataText>Nombre: {userData.name}</DataText>
                        <DataText>Apellido: {userData.surname}</DataText>
                        <DataText>Correo electrónico: {userData.email}</DataText>
                        <DataText>Usuario: {userData.nickname}</DataText>
                        <DataText>Password:</DataText>
                        <StyledButton>Modificar datos</StyledButton>
                    </DataColumn>
                    <div>
                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' style={{width: '200px', height: '200px'}}/>
                    </div>
                </PersonalDataRow>
            </DataSection>
            <DataSection>
                <DataTitle>Compras realizadas</DataTitle>
                <DataRow>
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                </DataRow>
                <StyledButton>Ver todas mis compras</StyledButton>
            </DataSection>
            <DataSection>
                <DataTitle>Publicaciones activas</DataTitle>
                <DataRow>
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                </DataRow>
                <StyledButton>Ver todas mis publicaciones</StyledButton>    
                <Link href="/addproduct" passHref>
                    <StyledButton>Crear publicacion</StyledButton>
                </Link>
            </DataSection>
            <DataSection>
                <DataTitle>Ventas realizadas</DataTitle>
                <DataRow>
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://cdn.pixabay.com/photo/2016/09/03/12/06/marvel-1641554_960_720.jpg"} /> 
                </DataRow>
                <StyledButton>Ver todas mis ventas</StyledButton>
            </DataSection>
        </StyledContainer>
    )
}

export default UserPanel;