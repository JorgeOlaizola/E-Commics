import Head from 'next/head';
import NavbarAdmin from './NavbarAdmin.js';
import AdminPanel from './AdminPanel.js';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { lightTheme, darkTheme, GlobalStyles, StyledApp} from '../globalStyle'
import styled, { ThemeProvider } from "styled-components";
import  ModalAlert from '../ModalAlert';
import { useRouter } from 'next/router';

const DivContainer = styled.div`
    background-color: ${(props) => props.theme.backgroundLevel1};
    ${'' /* width: 1024px; */}
    margin: 0px auto 30px auto;
    padding-bottom: 50px;
    min-height: 100vh;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 7px 1px;
    @media (min-width: 1440px) {
    width: 80%;
    }
    @media (min-width: 1800px) {
        width: 1440px;
    }
    @media (max-width: 1439px) {
        max-width: 1024px;
    }
    @media (max-width: 1024px) {
        margin: 0 auto;
    }
`;

const TopDiv = styled.div`
    height: 30px;
    @media (max-width: 1024px) {
        height: 0;
    }
`

const AdminDashboard = () => {
    const theme = useSelector(state => state.styles.theme)

    return (
        <div>
            <Head>
                <title>E-Commics</title>
            </Head>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <StyledApp>                    
            <TopDiv ></TopDiv>
                <DivContainer>
                    <NavbarAdmin theme={theme}/>
                    <ModalAlert/>
                    <AdminPanel></AdminPanel>
                </DivContainer>
            </StyledApp>
        </ThemeProvider>
        </div>
    )
}

export default AdminDashboard;

