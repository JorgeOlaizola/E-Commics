import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import SignInForm from '../components/SignInForm'
import styled from 'styled-components';


const HomeImageDiv = styled.div`
  margin: 0 auto;
  padding: 30px;
  max-width: 960px;
`

const Home = () => {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      {/* <SignInForm/> */}
        {/* E-Commics
        Home */}
        <HomeImageDiv >
          <Image src={'/ecommics-homecoming-500x600.jpg'} 
          alt="ecommics home coming soon!"
          layout="responsive"
      width={500}
      height={600}
          />
        </HomeImageDiv>
      </Container>
    </>
  )
}

export default Home;

