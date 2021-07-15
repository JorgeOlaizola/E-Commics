import Head from 'next/head';
import Container from '../../components/Container';
import UserPanel from '../../components/user-panel/UserPanel';
import UserPanelNav from '../../components/user-panel/UserPanelNav';
import UserPanelProfile from '../../components/user-panel/UserPanelProfile';
import { MainDiv  } from '../../components/globalStyle'

const User = () => {
  return (
    <>
      <Head>
      <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <UserPanel/>
        {/* <UserPanelNav/>
        <UserPanelProfile/> */}
      </Container>
    </>
  )
}

export default User;