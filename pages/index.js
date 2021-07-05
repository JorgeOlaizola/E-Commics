import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import SigInForm from '../components/SigInForm'

export default function Home() {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <SigInForm/>
        E-Commics
        Home
      </Container>
    </>
  )
}
