import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../store/store';
import '../styles/globals.css';
 
class MyApp extends App {

    render() {
        const { Component, pageProps } = this.props;
        return(
            <>
            <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            </head>
                <Provider store={store}>
                        <Component {...pageProps}></Component>
                </Provider>
            </>
        )
    }
}

const makestore = () => store;

const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);