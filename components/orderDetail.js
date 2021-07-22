import styled from 'styled-components'

const OrderDetailConteiner = styled.div`
width: 80%;
height: 700px;
border: 1px solid grey;
background-color: green;
border-radius: 1rem 1rem;
display: flex;
justify-content: center;
align-items:center;
`

const OrderDetailComponent = ({ orderProps }) => {
    
    console.log(orderProps)

    return (
        <OrderDetailConteiner>
            <h1>OrderDetail</h1>
        </OrderDetailConteiner>
    )
}

export default OrderDetailComponent