import Head from 'next/head';
import styled from 'styled-components'

const MainDiv = styled.div`
    margin: 0 2rem;
`

const Container = (props) => {
    return (
        <div>
            <Head>
                <title>E-Commics</title>
            </Head>
            <MainDiv>
                {props.children}
            </MainDiv>
        </div>
    )
}

export default Container;