import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../store/actions/normalUsersActions.js';
import styled from 'styled-components';
import { StyledLink } from '../pages/globalStyle.js';
import Find from './Find.js';
import UserMenu from './user-panel/UserMenu.js';
import Modal from './user-panel/Modal.js';
import React, {useState} from 'react';
import { useRouter } from 'next/router';


const Navbar = styled.nav`
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
    border-bottom: 1px solid;
    background: ${(props) => props.theme.backgroundNav};
    @media (max-width: 480px) {
      padding: 0 1rem;
    }
`

const StyledLogoResponsive = styled.a`
  
    @media (min-width: 769px) {
      display: none;
    }
    @media (max-width: 480px) {
      width: 10px;
    }
`

const StyledLogo = styled.a`
    @media (max-width: 768px) {
      display: none;
    }
`


const Nav = ({ theme}) => {
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
                    <Link href="/" passHref replace>
                        <StyledLogo>{theme === "light" 
                        ? <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /> 
                        : <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg"} />}
                        </StyledLogo>
                        {/* <StyledLink><img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /></StyledLink> */}
                    </Link>
                    <Link href="/" passHref replace>
                        <StyledLogoResponsive>
                        <img style={{height:"35px"}} src={"/ecommics-logo-responsive.svg"} />
                        </StyledLogoResponsive>
                    </Link>
                    <Link href="/search" passHref replace>
                        <StyledLink className={router.pathname == '/search' ? "active" : ""}>Explorar</StyledLink>
                    </Link>
                    <div className="findItem"><div className="findItemMargin"><Find /></div></div>
                    
                    <UserMenu/>
                    
            </Navbar>
        </>
    )
}

export default Nav;