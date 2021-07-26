import Head from 'next/head';
import Container from '../../components/Container';
import Confirmation from '../../components/Confirmation';

const Confirm = () => {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Confirmation></Confirmation>
      </Container>
    </>
  )
}

export default Confirm;