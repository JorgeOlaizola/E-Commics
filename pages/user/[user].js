import Head from 'next/head';
import Container from '../../components/Container';
import UserPanel from '../../components/user-panel/UserPanel';
import {useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const User = () => {
  const userData = useSelector(state => state.user.userData);
  const router = useRouter();

  useEffect(() => {
    if(!userData) {
        return router.push("/");
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