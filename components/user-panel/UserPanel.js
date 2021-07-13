import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GradientBorder, Input  } from '../../pages/globalStyle.js'


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
    ${'' /* border-color: #000; */}
    padding: 5px;
`

const WelcomeMessage = styled.h1`
    ${'' /* font-size: 2rem; */}
    ${'' /* color: #ED2024; */}
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

const DataTitle = styled.h2`
    ${'' /* font-size: 1.5rem; */}
    ${'' /* color: #000; */}
    ${'' /* margin-bottom: 10px; */}
    display: flex;
    align-self: center;
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
    display: flex;
    align-self: center;
    justify-content: center;
`

const UserPanel = () => {
    const userData = useSelector(state => state.user.userData);
    useEffect(() => {
        if(userData.log === false) {
            window.location.href = "/"
        }
}, []);

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
                        <GradientBorder className="">
                            <Input className="inputbutton" type="submit" />
                        </GradientBorder>
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
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fcomics%2Fimages%2F7%2F79%2FSuperman_2018_1.jpg%2Frevision%2Flatest%3Fcb%3D20180711111140&f=1&nofb=1"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iJJZfZWIREQpmX67YERo0AHaLD%26pid%3DApi&f=1"} /> 
                </DataRow>
                <StyledButton>Ver todas mis compras</StyledButton>
            </DataSection>
            <DataSection>
                <DataTitle>Publicaciones activas</DataTitle>
                <DataRow>
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIF.HXMbQ8FE4daH%252bc%252fbAw5K1Q%26pid%3DApi&f=1"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.mobygames.com%2Fimages%2Fcovers%2Fl%2F416543-fortnite-standard-founder-s-pack-playstation-4-front-cover.png&f=1&nofb=1"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.DOwZNFJWH1SX50GubY_dawHaId%26pid%3DApi&f=1"} /> 
                </DataRow>
                <StyledButton>Ver todas mis publicaciones</StyledButton>    
                <Link href="/addproduct" passHref replace>
                    <StyledButton>Crear publicacion</StyledButton>
                </Link>
            </DataSection>
            <DataSection>
                <DataTitle>Ventas realizadas</DataTitle>
                <DataRow>
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.KvZkOE4WXf4S_CZnjZoufwHaJf%26pid%3DApi&f=1"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.spUnBWRdQyzCeWK4eQqKowHaK9%26pid%3DApi&f=1"} /> 
                    <img style={{width:"150px", height:"200px"}} src={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cvynK5XO9key3eG9Z6eQSQHaLI%26pid%3DApi&f=1"} /> 
                </DataRow>
                <StyledButton>Ver todas mis ventas</StyledButton>
            </DataSection>
        </StyledContainer>
    )
}

export default UserPanel;