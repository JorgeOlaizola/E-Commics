import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledLink } from "../globalStyle";
import PacmanLoader from "react-spinners/PacmanLoader";
import Categories from './Categories.js';
import Users from './Users.js';
import Newsletters from './Newsletters.js';
import Ofertas from './Ofertas.js';
import AdminProfile from './AdminProfile.js';


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

const AdminPanel = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState("newsletters");
    const userData = useSelector((state) => state.user.userData);
    const router = useRouter();

    /*const data = {
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
      }*/

    /*useEffect(() => {
        if(!userData) {
            router.push("/");
        }
        
    }, [userData]);*/

    function handleClick(event) {
        setState(event.target.name);
    }

    /*if (!userData.user) {
        return  <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: '500px'}}><PacmanLoader color={"#000"} size={30}/></div>
    }*/

    return (
        <div>
            <StyledContainer>
                {/* <h2>Bienvenido, Admin!</h2> */}
                <Navbar>
                    <UserStyledLink
                        className={state === "newsletters" ? "active" : ""}
                        name="newsletters"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        Noticias
                    </UserStyledLink>
                    <UserStyledLink
                        className={state === "ofertas" ? "active" : ""}
                        name="ofertas"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        Ofertas
                    </UserStyledLink>
                    <UserStyledLink
                        className={state === "usuarios" ? "active" : ""}
                        name="usuarios"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        Usuarios
                    </UserStyledLink>
                    <UserStyledLink
                        className={state === "categorias" ? "active" : ""}
                        name="categorias"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        Categorías
                    </UserStyledLink>
                    <UserStyledLink
                        className={state === "perfil" ? "active" : ""}
                        name="perfil"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        Perfil
                    </UserStyledLink>
                </Navbar>

                {state === "newsletters"
                    ? <Newsletters/>
                    : state === "ofertas"
                    ? <Ofertas/>
                    : state === "usuarios"
                    ? <Users/>
                    : state === "categorias"
                    ? <Categories/>
                    : <AdminProfile/>}
            </StyledContainer>
        </div>
    );
};

export default AdminPanel;
