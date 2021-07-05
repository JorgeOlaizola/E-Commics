import Head from 'next/head';
import Container from '../../components/Container';
import UserPanel from '../../components/user-panel/UserPanel';

export default function User() {
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
