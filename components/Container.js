import Head from 'next/head';
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getCategories } from '../store/actions/categoriesActions.js';
import { lightTheme, darkTheme, GlobalStyles, StyledApp} from '../pages/globalStyle.js'
import styled, { ThemeProvider } from "styled-components";

const DivContainer = styled.div`
    background-color: ${(props) => props.theme.body};
    ${'' /* width: 1024px; */}
    margin: 30px auto 30px auto;
    min-height: 1024px;
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

const Container = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("estoy en el container", localStorage.getItem("sessionSaved"))
        dispatch(getCategories());
    }, [dispatch])
    const [theme, setTheme] = useState("light");
    const themeToggle = () => {
      theme === "light" ? setTheme("dark") : setTheme("light");
    };
    


    return (
        <div>
            <Head>
                <title>E-Commics</title>
            </Head>
            <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <StyledApp>
                <DivContainer>
                    <Navbar themeToggle={themeToggle} theme={theme}/>
                    {props.children}
                </DivContainer>
                <Footer/>
            </StyledApp>
        </ThemeProvider>
        </div>
    )
}

export default Container;

