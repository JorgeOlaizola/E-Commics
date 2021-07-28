import Container from '../../components/Container';
import OrderDetailComponent from '../../components/orderDetail'
import axios from 'axios';
import styled from 'styled-components'

const ComponentConteiner = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 40px;
`

const OrderDetail = (props) => {
    return (
      <>
        <Container>
            <ComponentConteiner>
                <OrderDetailComponent orderProps={props.orderProps}/>
            </ComponentConteiner>
        </Container>
      </>
    )
  }
  
  export default OrderDetail;

  export async function getServerSideProps(context){
    const { params } = context;
    const ABSOLUTE_URL = process.env.ABSOLUTE_URL
    const orderProps = await axios.get(`http://localhost:3000/api/orders/orderDetail?orderId=${params.orderDetail}`)
    
    return {
      props: { orderProps: orderProps.data}
    }
  }