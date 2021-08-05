import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getProductsByUser } from '../../store/actions/productActions';
import UserPanelProfile from './UserPanelProfile.js';
import UserPanelFavorites from './UserPanelFavorites.js';
import UserPanelBuys from './UserPanelBuys.js';
import UserPanelSellings from './UserPanelSellings.js';
import UserPanelPublications from './UserPanelPublications.js';
import styled from 'styled-components';
import { StyledLink } from '../globalStyle';
import WelcomeMessage from './WelcomeMessage.js';
import PacmanLoader from "react-spinners/PacmanLoader";
 
const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const UserStyledLink = styled(StyledLink)`
    padding: 0.2rem;
    margin: 0.2rem;
    @media (max-width: 375px){
    font-size: 0.8rem;
    }
`;


const Navbar = styled.nav`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
    border-bottom: 1px solid;
    background: ${(props) => props.theme.backgroundLevel2};
    max-width: 1024px;
    margin: 0 auto;
    @media (max-width: 480px) {
      padding: 0 1rem;
      justify-content: center;
    }
`

const UserPanel = (props) => {

    const dispatch = useDispatch();
    const [state, setState] = useState("compras");
    const userData = useSelector(state => state.user.userData);
    const products = useSelector(state => state.product.products);
    const router = useRouter();
  
    const data = {
          "user" : `${userData._id}`,
          "category": "",
          "score" : {
              "start":1,
              "end": 4
          },
           "price" : {
              "start":0,
              "end": 0
          },
          "search":{
              "in":"title",
              "text":""
          },
          "order":{
              "in": "price",
              "or": 1
          },
          "page": 1
      }

    function handleClick(event) {
        setState(event.target.name)
    }

    if (!userData.user) {
        return  <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: '500px'}}><PacmanLoader color={"#FFE100"} size={30}/></div>
    }

    
    return (
        <div>
            <StyledContainer>
                    
            <Navbar>
                    <UserStyledLink className={state === "compras" ? "active": ""} name="compras" onClick={(e) => {handleClick(e)}}>Compras</UserStyledLink>
                    <UserStyledLink className={state === "favoritos" ? "active": ""} name="favoritos" onClick={(e) => {handleClick(e)}}>Favoritos</UserStyledLink>
                    <UserStyledLink className={state === "publicaciones" ? "active": ""} name="publicaciones" onClick={(e) => {handleClick(e)}}>Publicaciones</UserStyledLink>
                    <UserStyledLink className={state === "ventas" ? "active": ""} name="ventas" onClick={(e) => {handleClick(e)}}>Ventas</UserStyledLink>
                    <UserStyledLink className={state === "perfil" ? "active": ""} name="perfil" onClick={(e) => {handleClick(e)}}>Perfil</UserStyledLink>
            </Navbar>
            <WelcomeMessage userDataName ={userData.name} />

            {
                props.view === "compras" || state === "compras" ? <UserPanelBuys/> :
                props.view === "favoritos" || state === "favoritos" ? <UserPanelFavorites/> :
                props.view === "publicaciones" || state === "publicaciones" ? <UserPanelPublications/> :
                props.view === "ventas" || state === "ventas" ? <UserPanelSellings/> :
                <UserPanelProfile/>
            }
        </StyledContainer>
        </div>
    
    )
}

export default UserPanel;