import styled from 'styled-components'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { updateOrders } from '../store/actions/normalUsersActions'

const OrderDetailConteiner = styled.div`
width: 80%;
height: 700px;
border: 1px solid grey;
background-color: green;
border-radius: 1rem 1rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items:center;
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

const OrderDetailComponent = ({ orderProps }) => {
    
    console.log(orderProps)
    const userData = useSelector(state => state.user.userData.user)
    const dispatch = useDispatch()
    console.log(userData)

    return (
        <OrderDetailConteiner>
            <p>Merchant Order: {orderProps.MerchantOrder}</p>
            <p>Payment: {orderProps.Payment}</p>
            <p>Buyer ID: {orderProps.buyer}</p>
            <p>Seller ID: {orderProps.seller}</p>
            <p>Status: { orderProps.status === 'approved' ? 'Pago realizado' : orderProps.stauts === 'pending' ? 'Pendiente de pago' : orderProps.status}</p>
            <p>{orderProps.products && orderProps.products.length > 0 ? 
            orderProps.products.map(p => {
                return (
                    <ProductOrderConteiner key={p._id}>
                        <span>Producto: <Link href={`/detail/${p._id}`} passHref >{p.title}</Link> __ Clickea el título para acceder al producto</span>
                        <span>Cantidad: {p.quantity}</span>
                        <span>Precio total: {p.quantity * p.unit_price}$</span>
                    </ProductOrderConteiner>
                )
            })
            :
            'No hay productos'
            }</p>
            { userData.id && userData.id === orderProps.seller &&  orderProps.status === 'approved' ? <button onClick={() => dispatch(updateOrders(orderProps._id, orderProps.status, userData.id))}>Despaché este producto</button> : null}
            { userData.id && userData.id === orderProps.buyer &&  orderProps.status === 'En proceso de entrega' ? <button onClick={() => dispatch(updateOrders(orderProps._id, orderProps.status, userData.id))}>Recibí este producto</button> : null}
            { userData.id && userData.id === orderProps.buyer &&  orderProps.status === 'Recibido' ? <button>Dejar review</button> : null}
            { userData.id && userData.id === orderProps.seller &&  orderProps.status === 'Recibido' ? <button>Dejar reseña de usuario</button> : null}
        </OrderDetailConteiner>
    )
}

export default OrderDetailComponent