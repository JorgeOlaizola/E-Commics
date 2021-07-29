import Head from 'next/head';
import Container from '../../components/Container';
import UserPanel from '../../components/user-panel/UserPanel';

const User = () => {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <UserPanel/>
      </Container>
    </>
  )
}

export default User;