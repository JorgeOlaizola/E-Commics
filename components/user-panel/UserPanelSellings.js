import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../store/actions/normalUsersActions'
import styled from 'styled-components';
import { GradientBorder, Input, StyledLink  } from '../globalStyle'
import OrdersFilters from '../OrdersFilters';

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
    @media (max-width:500px){
        width:100%;
        border:none;
        border-top:1px solid;
        border-bottom:1px solid;
    }
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

const OrderConteiner = styled.div`
width: 60%;
border-top: 0.5px solid black;
border-bottom: 0.5px solid black;
height: auto;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
margin: 10px;
&:hover{
    box-shadow: 0 0 20px rgba(33,33,33,.2)
}
@media (max-width:500px){
    width:100%;
}
`

const ProductOrderConteiner = styled.div`
width: 100%;
margin: 3px;
padding: 1rem;
display: flex;
justify-content: space-around;
flex-wrap: wrap;
align-items: center;
`

const ProductImg = styled.img`
width: 150px;
border: 1px solid black;
margin-bottom: 10px;
`

const ProductInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-end;
flex-wrap: wrap;
@media (max-width:500px){
    align-items: center;
}
`

const Advertise = styled.p`
    color: ${(props) => props.theme.blueColor};
    display: flex;
    align-self: flex-end;
`

const UserPanelSellings = () => {
    const userData = useSelector(state => state.user.userData.user);
    const sellerOrders = useSelector(state => state.user.sellerOrders)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrders('seller', userData.id))
}, [dispatch]);

    return (
        <StyledContainer>
             <DataSection>
                <h3>Tus ventas</h3>
            </DataSection>

            { sellerOrders ? 
            <>
            <OrdersFilters ordersCase="sellerOrders" userId={userData.id} eachCase="seller"/>
            {/* <button>Ver transacciones finalizadas</button> */}
            </>
            :
            <span></span>}

            { 
            sellerOrders && sellerOrders.length > 0 ? 
            sellerOrders.map(order => 
            {   let total = 0
                return (
                <OrderConteiner key={order._id}>
                    <Advertise>N° de orden: {order._id}</Advertise>

                    <Advertise>Estado: {order.status} - Comprador:  {order.buyer.nickname}</Advertise>

                        { order.products && order.products.length > 0 ? 
                        order.products.map(p => {
                            total += (p.quantity * p.unit_price)
                            return (
                            <ProductOrderConteiner key={p._id}>
                                <ProductImg src={p.image[0]}></ProductImg>
                                <ProductInfo>
                                    <p>Producto: &nbsp;
                                        <Link href={`/detail/${p._id}`} passHref >
                                            <StyledLink>

                                                {p.title}
                                            </StyledLink>
                                        </Link>
                                    </p>
                                    <p>Cantidad: {p.quantity}</p>
                                    <p>Precio total: ${p.quantity * p.unit_price}</p>
                                </ProductInfo>
                            </ProductOrderConteiner>
                            )
                        }) 
                        :
                        <div>No hay ningún producto en esta orden</div>
                        }
                        <h3 style={{alignSelf:'flex-end'}}>Monto total: {total}$</h3>
                        <Link href={`/orderDetail/[orderDetail]`} as={`/orderDetail/${order._id}`} passHref >
                            <p>
                                <StyledLink>
                                    Detalle de la orden

                                </StyledLink>
                            </p>
                        </Link>
                </OrderConteiner>)}) 
            : 
            <h2>No hay resultados</h2>
            }
        </StyledContainer>
    )
}

export default UserPanelSellings;