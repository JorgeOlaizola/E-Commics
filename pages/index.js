import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import SignInForm from '../components/SignInForm'
import styled from 'styled-components';
import OfferGame from '../components/OfferGame'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const HomeImageDiv = styled.div`
  margin: 0 auto;
  padding: 30px;
  max-width: 960px;
`

const Home = () => {
  const userData = useSelector(state => state.user.userData.user)
  const [view, setView] = useState(false)
  function handleView (){
    setView(!view)
  }
  return (
    <>

     <OfferGame handleView={handleView} view={view}/>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      {/* <SignInForm/> */}
        {/* E-Commics
        Home */}
        <HomeImageDiv >
        { userData?.id && <button onClick={handleView}>Obtener oferta</button>}
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

