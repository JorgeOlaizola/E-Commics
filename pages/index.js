import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Container from '../components/Container'
import SignInForm from '../components/SignInForm'
import styled from 'styled-components';
import LastPostedProducts from '../components/home/LastPostedProducts'
import FeaturedProducts from '../components/home/FeaturedProducts'
import HomeBanner from '../components/home/HomeBanner'
import CategoryCards from '../components/home/CategoryCards'
import axios from 'axios'

const HomeImageDiv = styled.div`
  margin: 0 auto;
  padding: 30px;
  max-width: 960px;
`

const Home = ({lastProducts, ratingProducts}) => {
  

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
          <HomeBanner />
          <LastPostedProducts lastProducts={lastProducts}></LastPostedProducts>
          <FeaturedProducts ratingProducts={ratingProducts}></FeaturedProducts>
          <CategoryCards></CategoryCards>
          {/* <Image src={'/ecommics-homecoming-500x600.jpg'} 
          alt="ecommics home coming soon!"
          layout="responsive"
      width={500}
      height={600}
          /> */}
        </HomeImageDiv>
      </Container>
    </>
  )
}

export default Home;

export async function getServerSideProps(context){
  const ABSOLUTE_URL = process.env.ABSOLUTE_URL
  const LastPostedProductscall = await axios.get(`${ABSOLUTE_URL}/api/products/home`)
  const ratingProducts = await axios.get(`${ABSOLUTE_URL}/api/products/home?rating=rating`)
  
  return {
    props: { 
      lastProducts: LastPostedProductscall.data,
      ratingProducts: ratingProducts.data
    }
  }
}
