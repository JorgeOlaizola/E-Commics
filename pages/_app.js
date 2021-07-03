import App from 'next/app';
import React, { useState} from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
import { lightTheme, darkTheme, GlobalStyles, StyledApp} from './globalStyle.js'
import { ThemeProvider } from "styled-components";


function MyComponent({children}) {

    const [theme, setTheme] = useState("light");

    const themeToggle = () => {
      theme === "light" ? setTheme("dark") : setTheme("light");
    };

    return (
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyles/>
            <StyledApp>
                <button onClick={() => themeToggle()}> Change theme</button>
                {children}
            </StyledApp>
        </ThemeProvider>) 
}


class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props;
        return(
            <Provider store={store}>
                <MyComponent>
                    <Component {...pageProps}></Component>
                </MyComponent>
            </Provider>
        )
    }
}

const makestore = () => store;

const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);