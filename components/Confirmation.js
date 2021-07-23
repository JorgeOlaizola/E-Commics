import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { confirmUser } from '../store/actions/normalUsersActions';
import { useRouter } from 'next/router';
import styled from "styled-components";

const StyledDiv = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const StyledMsg = styled.div`
    width: 50%;
    text-align: center;
    margin-top: 50px;
`

const Confirmation = () => {

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(confirmUser(token));
    }, [])
    
    const router = useRouter()
    const { token } = router.query

    const response = useSelector(state => state.user.confirmation);

    return (
        <StyledDiv>
            <StyledMsg>
                <h2>{response.error_msg || response.success_msg}</h2>
            </StyledMsg>
        </StyledDiv>
    )
}

export default Confirmation;