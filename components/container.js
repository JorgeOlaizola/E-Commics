import Head from 'next/head';
import Navbar from './Navbar.js';
import React, { useState} from 'react';
import { lightTheme, darkTheme, GlobalStyles, StyledApp} from '../pages/globalStyle.js'
import { ThemeProvider } from "styled-components";


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
                {props.children}
                <Navbar themeToggle={themeToggle}/>
            </StyledApp>
        </ThemeProvider>
        </div>
    )
}

export default Container;

