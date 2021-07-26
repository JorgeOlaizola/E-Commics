import Head from 'next/head'
import Container from '../../components/Container'
import PrivacyTerms from '../../components/PrivacyTerms'

const PrivacyRoute = () => {
    return(
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <PrivacyTerms/>
            </Container>
        </>
    )
}

export default PrivacyRoute;