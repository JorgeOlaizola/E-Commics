import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../store/actions/normalUsersActions.js';
import styled from 'styled-components';
import { Button } from '../pages/globalStyle.js'
import Find from './Find.js';
import UserMenu from './user-panel/UserMenu.js';
import Modal from './user-panel/Modal.js';
import React, {useState} from 'react';

const Navbar = styled.nav`
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
    border-bottom: 1px solid;
`

const StyledLink = styled.a`
    padding: 0rem 2rem;
    text-decoration: none;
    font-size: 0.875rem;
`

const Nav = ({themeToggle, theme}) => {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const userData = useSelector(state => state.user.userData)

    function handleSignOut() {
        dispatch(signOut())
    }

    return(
        <Navbar>
            {/* <button onClick={() => props.themeToggle()}>Cambiar modo</button> */}
                <Link href="/" passHref>
                    <StyledLink>{theme === "light" 
                    ? <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /> 
                    : <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg"} />}
                    </StyledLink>
                    {/* <StyledLink><img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /></StyledLink> */}
                </Link>
                <Find />
                <Link href="/search" passHref>
                    <StyledLink>Buscador</StyledLink>
                </Link>
                {/* <Link href="/signuppage" passHref>
                    <StyledLink>Crear cuenta</StyledLink>
                </Link>
                <Link href="/" passHref>
                    <StyledLink>Ingresá</StyledLink>
                </Link>
                <Link href={`/user/${userData.nickname}`} passHref>
                    <StyledLink>Panel de usuario</StyledLink>
                </Link>
                <Link href="/" passHref>
                    <StyledLink onClick={() => {handleSignOut()}}>Salir</StyledLink>
                </Link> */}
                <UserMenu themeToggle={themeToggle}/>
                {/* <input
                onChange={themeToggle}
                className="react-switch-checkbox"
                id={`react-switch-new1`}
                type="checkbox"
                />
                <label
                // style={{ background: isOn && '#06D6A0' }}
                className="react-switch-label"
                htmlFor={`react-switch-new1`}
                >
                <span className={`react-switch-button`} />
                </label> */}
        </Navbar>
    )
}

export default Nav;