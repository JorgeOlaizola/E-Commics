import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import SignUp from '../components/SignUp'

const SignUpPage = () => {
  return (
    <>
      <Head>
      <script src="https://kit.fontawesome.com/ce5aa76b2a.js" crossorigin="anonymous"></script>
      </Head>
      <Container>
        <SignUp/>
      </Container>
    </>
  )
}

export default SignUpPage;