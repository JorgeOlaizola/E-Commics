import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { confirmUser } from '../store/actions/normalUsersActions';
import { useRouter } from 'next/router';

const Confirmation = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(confirmUser(token));
    }, [])
    
    const router = useRouter()
    const { token } = router.query

    const response = useSelector(state => state.user.confirmation);

    return (
        <div>
            {response.error_msg || response.success_msg}
        </div>
    )
}

export default Confirmation;