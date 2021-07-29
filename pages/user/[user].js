import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Container from '../../components/Container';
import UserPanel from '../../components/user-panel/UserPanel';

const User = () => {
  const router = useRouter();
  const userData = useSelector(state => state.user.userData);
  useEffect(() => {
    if(!userData) {
        router.push("/");
    }  
  }, [userData]);

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