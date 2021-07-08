import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import SignInForm from '../components/SignInForm'

const Home = () => {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <SignInForm/>
        E-Commics
        Home
      </Container>
    </>
  )
}

export default Home;