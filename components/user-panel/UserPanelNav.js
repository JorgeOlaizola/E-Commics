import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { StyledLink } from '../globalStyle';

const Navbar = styled.nav`
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
    border-bottom: 1px solid;
    background: ${(props) => props.theme.backgroundNav};
    max-width: 960px;
    margin: 0 auto;
    @media (max-width: 480px) {
      padding: 0 1rem;
    }
`


const UserPanelNav = () => {
    const router = useRouter();

    return(
        <>
            <Navbar>
                    <Link href="/" passHref replace>
                        <StyledLink className={router.pathname == '/' ? "active" : ""}>Perfil</StyledLink>
                    </Link>
                    <Link href="/" passHref replace>
                        <StyledLink className={router.pathname == '/' ? "active" : ""}>Compras</StyledLink>
                    </Link>
                    <Link href="/" passHref replace>
                        <StyledLink className={router.pathname == '/' ? "active" : ""}>Ventas</StyledLink>
                    </Link>
                    <Link href="/" passHref replace>
                        <StyledLink className={router.pathname == '/' ? "active" : ""}>Publicaciones</StyledLink>
                    </Link>
                    <Link href="/" passHref replace>
                        <StyledLink className={router.pathname == '/' ? "active" : ""}>Favoritos</StyledLink>
                    </Link>
            </Navbar>
        </>
    )
}

export default UserPanelNav;