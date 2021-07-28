import styled from 'styled-components'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { updateOrders } from '../store/actions/normalUsersActions'
import axios from 'axios'
import { useRouter } from 'next/router'
import OrderDetailProduct from './OrderDetailProduct'

const OrderDetailConteiner = styled.div`
width: 80%;
height: 700px;
border: 1px solid grey;
border-radius: 1rem 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
`


const ProductOrderConteiner = styled.div`
width: 70%;
border: 0.5px solid black;
padding: 1rem;
display: flex;
justify-content: center;
flex-direction: raw;
`

const ProductImg = styled.img`
width: auto;
height: 150px;
border: 1px solid black
`

const ProductInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 5px;
`

const OrderDetailComponent = ({ orderProps }) => {
    
    const router = useRouter()
    const userData = useSelector(state => state.user.userData.user)
    useEffect(() => {
        if(!userData) {
            router.push("/")
        }
    }, [])
    const dispatch = useDispatch()
    console.log(userData)
    let total = 0

 
    return (
        <OrderDetailConteiner>
            <p>Merchant Order: {orderProps.MerchantOrder}</p>
            <p>Pago: {orderProps.Payment}</p>
            <p>Comprador: {orderProps.buyer.name} {orderProps.buyer.surname} ({orderProps.buyer.nickname})</p>
            <p>Vendedor: {orderProps.seller.name} {orderProps.seller.surname} ({orderProps.seller.nickname})</p>
            <p>Estado: { orderProps.status === 'approved' ? 'Pago realizado' : orderProps.stauts === 'pending' ? 'Pendiente de pago' : orderProps.status}</p>
            <p>Productos: {orderProps.products && orderProps.products.length > 0 ?
            <span>
            {
            orderProps.products.map(p => {                
                total += (p.quantity * p.unit_price)
                return (
                    <OrderDetailProduct key={p._id} p={p} orderProps={orderProps}/>

                )
            })}
            Monto final: {total}$
            </span>
            :
            'No hay productos'
            }</p>
            { userData && userData.id === orderProps.seller._id &&  orderProps.status === 'approved' ? <button onClick={() => dispatch(updateOrders(orderProps._id, orderProps.status, userData.id))}>Despaché este producto</button> : null}
            { userData && userData.id === orderProps.buyer._id &&  orderProps.status === 'En proceso de entrega' ? <button onClick={() => dispatch(updateOrders(orderProps._id, orderProps.status, userData.id))}>Recibí este producto</button> : null}
        </OrderDetailConteiner>
    )
}

export default OrderDetailComponent
