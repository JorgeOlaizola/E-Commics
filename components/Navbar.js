import Link from 'next/link';
import styled from 'styled-components';

const Navbar = styled.nav`
    height: 80px;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 1px solid;
`

const StyledLink = styled.a`
    padding: 0rem 2rem;
    text-decoration: none;
    font-size: 0.875rem;
`

const Nav = (props) => {
    return(
        <Navbar>
            <button onClick={() => props.themeToggle()}>Cambiar modo</button>
                <Link href="/" passHref>
                    <StyledLink>Logo-home</StyledLink>
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
        </Navbar>
    )
}

export default Nav;