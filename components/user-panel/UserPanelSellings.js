import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../store/actions/normalUsersActions'
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'


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

const OrderConteiner = styled.div`
width: 80%;
border: 1px solid grey;
border-radius: 1rem 1rem;
height: auto;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 10px;
`

const ProductOrderConteiner = styled.div`
width: 70%;
border: 0.5px solid black;
margin: 3px;
padding: 1rem;
display: flex;
justify-content: center;
flex-direction: column;
`

const UserPanelSellings = () => {
    const userData = useSelector(state => state.user.userData.user);
    const sellerOrders = useSelector(state => state.user.sellerOrders)
    const dispatch = useDispatch()
    useEffect(() => {
        if(userData.log === false) {
            window.location.href = "/"
        }
        dispatch(getOrders('seller', userData.id))
}, []);



    return (
        <StyledContainer>
            <DataSection>
                Ventas
            </DataSection>
            { 
            sellerOrders && sellerOrders.length > 0 ? 
            sellerOrders.map(order => 
            {   let total = 0
                return (
                <OrderConteiner key={order._id}>
                <h4>Orden {order._id}</h4>
                Estado: {order.status} - ID Comprador:  {order.buyer}
                    { order.products && order.products.length > 0 ? 
                    order.products.map(p => {
                        total += (p.quantity * p.unit_price)
                        return (
                        <ProductOrderConteiner>
                            <span>Producto: <Link href={`/detail/${p._id}`} passHref >{p.title}</Link> __ Clickea el título para acceder al producto</span>
                            <span>Cantidad: {p.quantity}</span>
                            <span>Precio total: {p.quantity * p.unit_price}$</span>
                        </ProductOrderConteiner>
                        )
                    }) 
                    :
                    <div>No hay ningún producto en esta orden</div>
                    }
                    <span>Monto total: {total}$</span>
                    <Link href={`/orderDetail/[orderDetail]`} as={`/orderDetail/${order._id}`} passHref ><p>Detalle de la orden</p></Link>
                </OrderConteiner>)}) 
            : 
            <div>No tienes compras todavía!</div>
            }
        </StyledContainer>
    )
}

export default UserPanelSellings;