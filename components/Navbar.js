import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../store/actions/normalUsersActions.js';
import styled from 'styled-components';
import { Button, Navbar, StyledLink, StyledLogo, StyledLogoResponsive } from '../pages/globalStyle.js'
import Find from './Find.js';
import UserMenu from './user-panel/UserMenu.js';
import Modal from './user-panel/Modal.js';
import React, {useState} from 'react';
import { useRouter } from 'next/router';


const Nav = ({themeToggle, theme}) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch()

    const userData = useSelector(state => state.user.userData)

    function handleSignOut() {
        dispatch(signOut())
    }

    return(
        <>
            <Navbar>
                {/* <button onClick={() => props.themeToggle()}>Cambiar modo</button> */}
                    <Link href="/" passHref>
                        <StyledLogo>{theme === "light" 
                        ? <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /> 
                        : <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg"} />}
                        </StyledLogo>
                        {/* <StyledLink><img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /></StyledLink> */}
                    </Link>
                    <Link href="/" passHref>
                        <StyledLogoResponsive>
                        <img style={{height:"50px"}} src={"/ecommics-logo-responsive.svg"} />
                        </StyledLogoResponsive>
                    </Link>
                    <Link href="/search" passHref>
                        <StyledLink className={router.pathname == '/search' ? "active" : ""}>Explorar</StyledLink>
                    </Link>
                    <div className="findItem"><div className="findItemMargin"><Find /></div></div>
                    
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
        </>
    )
}

export default Nav;