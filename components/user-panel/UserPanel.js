import { useSelector } from 'react-redux';
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
    justify-content: space-between;
`

export default function User() {

    const userData = useSelector(state => state.user.userData)

    return (
        <StyledContainer>
            <div>
                Hola {userData.name}!
            </div>
            <h1>Datos personales</h1>
            <DataSection>
                <div>
                    <h2>Nombre: {userData.name}</h2>
                    <h2>Apellido: {userData.surname}</h2>
                    <h2>Correo electrónico: {userData.email}</h2>
                    <h2>Usuario: {userData.nickname}</h2>
                    <h2>Password:</h2>
                    <h3>Modificar datos</h3>
                </div>
                <div>
                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' style={{width: '200px', height: '200px'}}/>
                </div>
            </DataSection>
            <h1>Compras</h1>
            <DataSection>
                <h2>compra 1</h2>
                <h2>compra 2</h2>
                <h2>compra 3</h2>
            </DataSection>
            <h2>Ver todas mis compras</h2>
            <h1>Publicaciones</h1>
            <DataSection>
                <h2>publicacion 1</h2>
                <h2>publicacion 2</h2>
                <h2>publicacion 3</h2>
            </DataSection>
            <h2>Ver todas mis publicaciones</h2>
            <h2>Crear publicacion</h2>
            <h1>Ventas</h1>
            <DataSection>
                <h2>venta 1</h2>
                <h2>venta 2</h2>
                <h2>venta 3</h2>
            </DataSection>
            <h2>Ver todas mis ventas</h2>
        </StyledContainer>
    )
}
