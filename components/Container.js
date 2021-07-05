import Head from 'next/head';
import Navbar from './Navbar.js';
import React, { useState} from 'react';
import { lightTheme, darkTheme, GlobalStyles, StyledApp} from '../pages/globalStyle.js'
import styled, { ThemeProvider } from "styled-components";

const DivContainer = styled.div`
    background-color: ${(props) => props.theme.body};
    max-width: 1024px;
    margin: 30px auto 0 auto;
    height: 1024px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 7px 1px;
`;

const Container = (props) => {

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
            </StyledApp>
        </ThemeProvider>
        </div>
    )
}

export default Container;

