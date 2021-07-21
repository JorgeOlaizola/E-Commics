import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'
import { getOrders } from '../../store/actions/normalUsersActions'


const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DataSection = styled.div`
    width: 60%;
    display: flex;
    margin: 20px 0;
    border-style: solid;
    border-width: 1px;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
`

const WelcomeMessage = styled.h1`
    ${'' /* font-size: 2rem; */}
    ${'' /* color: #ED2024; */}
`


const DataColumn = styled.div`
    width: 250px;
    margin: 10px;
`

const DataText = styled.p`
    ${'' /* font-size: 1rem; */}
    ${'' /* color: #000; */}
    ${'' /* margin: 2.5px 0; */}
    ${'' /* line-height: 150%; */}
`

const StyledButton = styled.button`
    width: 200px;
    margin-top: 5px;

`

const ProfileImg = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
`

const UserPanelBuys = () => {
    const userData = useSelector(state => state.user.userData.user);
    const buyersOrders = useSelector(state => state.user.buyerOrders)
    const dispatch = useDispatch()
    useEffect(() => {
        if(userData.log === false) {
            window.location.href = "/"
        }
        dispatch(getOrders('buyer', userData.id))
}, []);

    return (
        <StyledContainer>
            <DataSection>
                Compras
            </DataSection>
            { 
            buyersOrders && buyersOrders.length > 0 ? 
            buyersOrders.map(order => <div key={order._id}>{order.status} - {order.seller}</div>) 
            : 
            <div>No tienes compras todavía!</div>
            }
        </StyledContainer>
    )
}

export default UserPanelBuys;