import Link from 'next/link';
import { useSelector, useDispatch } from "react-redux";
import { signOut } from '../store/actions/normalUsersActions.js';
import styled from 'styled-components';
import { StyledLink } from './globalStyle';
import Find from './Find.js';
import UserMenu from './user-panel/UserMenu.js';
import Modal from './user-panel/Modal.js';
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { SearchIcon } from '@heroicons/react/outline';
import { IoIosBrowsers } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';


const Navbar = styled.nav`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
    border-bottom: 1px solid ${(props) => props.theme.colorLevel3};
    background: ${(props) => props.theme.backgroundLevel1};
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 1000;
    box-shadow: 0 0 11px rgba(33,33,33,.2);
    @media (max-width: 480px) {
      padding: 0 1rem;
    }
`

const NavbarSearch = styled.nav`
    height: 60px;
    border-bottom: 1px solid;
    width: 100%;
    background: ${(props) => props.theme.backgroundLevel1};
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 1000;
    box-shadow: 0 0 11px rgba(33,33,33,.2);
`

const StyledLogoResponsive = styled.a`

    @media (min-width: 769px) {
      display: none;
    }
    @media (max-width: 480px) {
      width: 10px;
      margin-right: 20px;
    }
`

const StyledLogo = styled.a`
    @media (max-width: 768px) {
      display: none;
    }
`

const StyledImage = styled.div`
    width: 150px;
    height: 50px;
    position: relative;
`

const StyledResponsive = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
`

const Nav = ({ theme}) => {
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [showResNav, setShowResNav] = useState(false);
    const [resFind, setResFind] = useState(false);

    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.userData)

    function handleSignOut() {
        dispatch(signOut())
    }

    const handleNavbar = (e) => {
        e.preventDefault();
        setShowResNav(true)
        setResFind(true)
    }

    const ResNavFalse = () => {
        setShowResNav(false)
    }

    const ToogleResFind = () => {
        setResFind(false)
    }

    return(
        <>
            {!showResNav ?  <Navbar>
                {/* <button onClick={() => props.themeToggle()}>Cambiar modo</button> */}
                    <Link href="/" passHref >
                        <StyledLogo>{theme === "light" 
                            ? <StyledImage>
                                <Image 
                                src='https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg' 
                                layout='fill'
                                objectFit="contain" 
                                alt="logo"/>
                            </StyledImage>
                            : <StyledImage>
                                <Image 
                                src={'https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg'} 
                                layout='fill'
                                objectFit="contain" 
                                alt="logo"/>
                            </StyledImage>}
                        </StyledLogo>
                    </Link>
                    <Link href="/" passHref >
                        <StyledLogoResponsive>
                            <StyledResponsive>
                                <Image 
                                src={'/ecommics-logo-responsive.svg'}
                                layout='fill'
                                objectFit="contain" 
                                alt="logo"/>
                            </StyledResponsive>
                        </StyledLogoResponsive>
                    </Link>
                    <Link href="/search" passHref >
                        <StyledLink className={router.pathname == '/search' ? "active" : ""}>Explorar</StyledLink>
                    </Link>
                    <div className="findItem"><div className="findItemMargin"><Find /></div></div>
                    <FaSearch className="findIcon480" onClick={handleNavbar}/>
                    <UserMenu/>         
            </Navbar>
            : <NavbarSearch>
                <Find ResNavFalse={ResNavFalse} ToogleResFind={ToogleResFind} resFind={resFind}/>
            </NavbarSearch> 
            }
        </>
    )
}

export default Nav;

