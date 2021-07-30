import styled from 'styled-components'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { updateOrders } from '../store/actions/normalUsersActions'
import axios from 'axios'
import { useRouter } from 'next/router'
import OrderDetailProduct from './OrderDetailProduct'
import { GradientBorder } from './globalStyle'

const OrderDetailConteiner = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: top;
align-items:center;
`

const StyledTop = styled.div`
width: 80%;
height: 200px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
text-align: center;
background-color: ${(props) => props.theme.backgroundQA};
border: 1px solid ${(props) => props.theme.colorLevel1};
border-bottom: none;
`

const StyledWhiteBox = styled.div`
width: 80%;
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;
padding: 20px 10px;
border: 1px solid ${(props) => props.theme.colorLevel1};
border-top: none;
${'' /* @media (max-width: 435px){
    align-items:left;
    justify-content: left; */}

}
`

const ProductOrderConteiner = styled.div`
width: 70%;
border: 0.5px solid black;
padding: 1rem;
display: flex;
justify-content: center;
flex-direction: raw;
@media (max-width: 768px) {
    width: 90%;
}
`

const ProductImg = styled.img`
width: auto;
height: 150px;
border: 1px solid ${(props) => props.theme.colorLevel1};
`

const ProductInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 5px;
`

const StyledButton = styled.button`
border: 1px solid ${(props) => props.theme.colorLevel1};
font-size: 18px;
background-color: transparent;
padding: 5px;
cursor: pointer;
&:hover{
    box-shadow: 4px 2px 2px rgb(0,0,0,0.5);
}
`

const Space = styled.div`
height: 10px;
`

const OrderDetailComponent = ({ orderProps }) => {
    
    const router = useRouter()
    // const userData = useSelector(state => state.user.userData.user)
    const [userData, setUserData] = useState('')
    const [userRole, setUserRole] = useState("")
    if (typeof window !== "undefined" && userData === ''){
        localStorage.getItem("sessionSaved") ? setUserData(JSON.parse(localStorage.getItem("sessionSaved"))) : null 
    }
    useEffect(() => {
        if(!userData.user) {
            router.push("/")
        }
        if(userData.user.nickname === orderProps.buyer.nickname) {
            setUserRole("buyer");
        }else{
            setUserRole("seller");
        }
    }, [userData])
    const dispatch = useDispatch()
    let total = 0

    const buyerDisplay = {
        name: orderProps.buyer.name,
        mainTitle: `Este es el resumen de tu compra a: ${orderProps.seller.name} ${orderProps.seller.surname} (${orderProps.seller.nickname})`,
        type: 'compra'
    }

    const sellerDisplay = {
        name: orderProps.seller.name,
        mainTitle: `Este es el resumen de tu venta a: ${orderProps.buyer.name} ${orderProps.buyer.surname} (${orderProps.buyer.nickname})`,
        type: 'venta'
    }
 
    return (
        <OrderDetailConteiner>
            <StyledTop>
                <h1>¡Hola {userRole === "buyer" ? buyerDisplay.name : sellerDisplay.name}!</h1>
                <h4>{userRole === "buyer" ? buyerDisplay.mainTitle : sellerDisplay.mainTitle}</h4>
            </StyledTop>
            <StyledWhiteBox>
                <p style={{textAlign: "center"}}><strong>Número de orden de Mercado Pago:</strong> {orderProps.MerchantOrder}</p>
                <p style={{textAlign: "center"}}><strong>Número de pago:</strong> {orderProps.Payment}</p>
                <p style={{textAlign: "center"}}><strong>Estado de la {userRole === "buyer" ? buyerDisplay.type : sellerDisplay.type}:</strong> {orderProps.status}</p>
                <br/><br/>
                <h3><strong>Artículos</strong></h3>
                <br/>
                {orderProps.products && orderProps.products.length > 0 ?
                <span>
                {
                    orderProps.products.map(p => {                
                        total += (p.quantity * p.unit_price)
                        return (
                            <OrderDetailProduct key={p._id} p={p} orderProps={orderProps}/>

                        )
                    })}
                    <p style={{textAlign:"center",marginTop:"10px"}}><strong>Monto final:</strong> ${total}</p>
                    </span>
                    :
                    'No hay productos'
                }
            </StyledWhiteBox>
            <Space/>
            { userData.user && userData.user.id === orderProps.seller._id &&  orderProps.status === 'Pago realizado' ? 
                    <StyledButton onClick={() => {
                        dispatch(updateOrders(orderProps._id, orderProps.status, userData.user.id))
                        alert('Estado actualizado')
                        router.push(`/orderDetail/${orderProps._id}`)
                        }}>Ya despaché este producto</StyledButton>
                : null
            }
            { userData.user && userData.user.id === orderProps.buyer._id &&  orderProps.status === 'En proceso de entrega' ? 
            <StyledButton onClick={() => {
                dispatch(updateOrders(orderProps._id, orderProps.status, userData.user.id))
                alert('Estado actualizado')
                router.push(`/orderDetail/${orderProps._id}`)
                }}>Recibí este producto</StyledButton> : null}
        </OrderDetailConteiner>
    )
}

export default OrderDetailComponent
