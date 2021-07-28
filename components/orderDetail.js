import styled from 'styled-components'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
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
    // const userData = useSelector(state => state.user.userData.user)
    const [userData, setUserData] = useState('')
    if (typeof window !== "undefined" && userData === ''){
        localStorage.getItem("sessionSaved") ? setUserData(JSON.parse(localStorage.getItem("sessionSaved"))) : null 
    }
    useEffect(() => {
        if(!userData.user) {
            router.push("/")
        }
    }, [userData])
    const dispatch = useDispatch()
    let total = 0

 
    return (
        <OrderDetailConteiner>
            <p>Merchant Order: {orderProps.MerchantOrder}</p>
            <p>Pago: {orderProps.Payment}</p>
            <p>Comprador: {orderProps.buyer.name} {orderProps.buyer.surname} ({orderProps.buyer.nickname})</p>
            <p>Vendedor: {orderProps.seller.name} {orderProps.seller.surname} ({orderProps.seller.nickname})</p>
            <p>Estado: {orderProps.status}</p>
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
            { userData.user && userData.user.id === orderProps.seller._id &&  orderProps.status === 'Pago realizado' ? 
            <button onClick={() => {
                dispatch(updateOrders(orderProps._id, orderProps.status, userData.user.id))
                alert('Estado actualizado')
                router.push(`/orderDetail/${orderProps._id}`)
                }}>Despaché este producto</button> : null}
            { userData.user && userData.user.id === orderProps.buyer._id &&  orderProps.status === 'En proceso de entrega' ? 
            <button onClick={() => {
                dispatch(updateOrders(orderProps._id, orderProps.status, userData.user.id))
                alert('Estado actualizado')
                router.push(`/orderDetail/${orderProps._id}`)
                }}>Recibí este producto</button> : null}
        </OrderDetailConteiner>
    )
}

export default OrderDetailComponent
