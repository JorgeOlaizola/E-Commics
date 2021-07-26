import Head from 'next/head';
import Container from '../../components/Container';
import PasswordReset from '../../components/PasswordReset';
import { checkToken } from '../../store/actions/normalUsersActions';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Reset = () => {

  const dispatch = useDispatch();
  
  const router = useRouter()
  const { token } = router.query

  useEffect(() => {
    dispatch(checkToken(token))
  }, [])

  const check = useSelector(state => state.user.passTokenCheck);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {
          check.error ?
            <div>
              {check.error_msg}
            </div>
          :
            <PasswordReset></PasswordReset>
        }
      </Container>
    </>
  )
}

export default Reset;