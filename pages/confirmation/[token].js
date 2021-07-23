import Head from 'next/head';
import Container from '../../components/Container';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { confirmUser } from '../../store/actions/normalUsersActions';
import { useRouter } from 'next/router';

const Confirmation = () => {

  const dispatch = useDispatch();

  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    console.log(token)
    //ACA VA EL DISPATCH DE UNA ACTION QUE CAMBIE EL CONFIRMED DEL MODELO PASANDOLE EL TOKEN
    dispatch(confirmUser(token));
  }, [])

  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        Cuenta verificada
      </Container>
    </>
  )
}

export default Confirmation;