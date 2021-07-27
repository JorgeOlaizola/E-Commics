import Head from 'next/head'
import Container from '../../components/Container'
import ContactForm from '../../components/ContactForm'

const ContactRoute = () => {
    return(
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <ContactForm/>
            </Container>
        </>
    )
}

export default ContactRoute;
