import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '../pages/globalStyle.js'


const Navbar = styled.nav`
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    border-bottom: 1px solid;
`

const StyledLink = styled.a`
    padding: 0rem 2rem;
    text-decoration: none;
    font-size: 0.875rem;
`

const Nav = ({themeToggle, theme}) => {
    return(
        <Navbar>
            {/* <button onClick={() => props.themeToggle()}>Cambiar modo</button> */}
                <Link href="/" passHref>
                    {/* <StyledLink>{theme === "light" 
                    ? <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /> 
                    : <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg"} />}
                    </StyledLink> */}
                    <StyledLink><img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"} /></StyledLink>
                </Link>
                <Link href="/" passHref>
                    <StyledLink>Buscador</StyledLink>
                </Link>
                <Link href="/" passHref>
                    <StyledLink>Crear cuenta</StyledLink>
                </Link>
                <Link href="/" passHref>
                    <StyledLink>Ingresá</StyledLink>
                </Link>
                <Link href="/" passHref>
                    <StyledLink>Panel de usuario</StyledLink>
                </Link>
                <Link href="/" passHref>
                    <StyledLink>Salir</StyledLink>
                </Link>
                <input
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
                </label>
        </Navbar>
    )
}

export default Nav;