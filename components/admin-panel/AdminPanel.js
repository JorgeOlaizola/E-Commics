import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { StyledLink } from "../globalStyle";
import PacmanLoader from "react-spinners/PacmanLoader";

const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserStyledLink = styled(StyledLink)`
    padding: 0.2rem;
    margin: 0.2rem;
`;

const DataSection = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    margin: 20px 0;
    border-style: solid;
    border-width: 1px;
    ${"" /* border-color: #000; */}
    padding: 5px;
`;

const DataRow = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const PersonalDataRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const DataColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

const DataTitle = styled.h2`
    ${"" /* font-size: 1.5rem; */}
    ${"" /* color: #000; */}
    ${"" /* margin-bottom: 10px; */}
    display: flex;
    align-self: center;
`;

const DataText = styled.p`
    ${"" /* font-size: 1rem; */}
    ${"" /* color: #000; */}
    ${"" /* margin: 2.5px 0; */}
    ${"" /* line-height: 150%; */}
`;

const StyledButton = styled.button`
    width: 200px;
    margin-top: 5px;
    display: flex;
    align-self: center;
    justify-content: center;
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
    }
`;

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
                <h2>Bienvenido, Admin!</h2>
                <Navbar>
                    <UserStyledLink
                        className={state === "newsletters" ? "active" : ""}
                        name="newsletters"
                        onClick={(e) => {
                            handleClick(e);
                        }}
                    >
                        Newsletters
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
                        Perfil Admin
                    </UserStyledLink>
                </Navbar>

                {state === "newsletters"
                    ? "NEWSLETTERS"
                    : state === "ofertas"
                    ? "OFERTAS"
                    : state === "usuarios"
                    ? "USUARIOS"
                    : state === "categorias"
                    ? "CATEGORÍAS"
                    : "ADMIN PERFIL"}
            </StyledContainer>
        </div>
    );
};

export default AdminPanel;
