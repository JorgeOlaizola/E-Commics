import Head from 'next/head'
import Container from '../../components/Container'
import Terms from '../../components/Terms'

const TermsRoute = () => {
    return(
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <Terms/>
            </Container>
        </>
    )
}

export default TermsRoute;