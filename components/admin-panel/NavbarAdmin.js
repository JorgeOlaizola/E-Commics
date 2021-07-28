import Link from "next/link";
import styled from "styled-components";
import UserMenu from "../user-panel/UserMenu.js";
import Image from "next/image";

const Navbar = styled.nav`
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
    border-bottom: 1px solid ${(props) => props.theme.colorLevel3};
    background: ${(props) => props.theme.backgroundLevel1};
    position: -webkit-sticky;
    position: sticky;
    top: 0px;
    z-index: 1000;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    @media (max-width: 480px) {
        padding: 0 1rem;
    }
`;

const StyledLogoResponsive = styled.a`
    @media (min-width: 769px) {
        display: none;
    }
    @media (max-width: 480px) {
        width: 10px;
        margin-right: 20px;
    }
`;

const StyledLogo = styled.a`
    @media (max-width: 768px) {
        display: none;
    }
`;

const StyledImage = styled.div`
    width: 150px;
    height: 50px;
    position: relative;
`;

const StyledResponsive = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
`;

const NavbarAdmin = ({ theme }) => {
    return (
        <>
            {
                <Navbar>
                    <Link href="/" passHref>
                        <StyledLogo>
                            {theme === "light" ? (
                                <StyledImage>
                                    <Image
                                        src="https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo.svg"
                                        layout="fill"
                                        objectFit="contain"
                                        alt="logo"
                                    />
                                </StyledImage>
                            ) : (
                                <StyledImage>
                                    <Image
                                        src={
                                            "https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg"
                                        }
                                        layout="fill"
                                        objectFit="contain"
                                        alt="logo"
                                    />
                                </StyledImage>
                            )}
                        </StyledLogo>
                    </Link>
                    <Link href="/" passHref>
                        <StyledLogoResponsive>
                            <StyledResponsive>
                                <Image
                                    src={"/ecommics-logo-responsive.svg"}
                                    layout="fill"
                                    objectFit="contain"
                                    alt="logo"
                                />
                            </StyledResponsive>
                        </StyledLogoResponsive>
                    </Link>
                    <UserMenu />
                </Navbar>
            }
        </>
    );
};

export default NavbarAdmin;
