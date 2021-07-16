import Container from '../../components/Container';
import Productdetail from '../../components/ProductDetail'
import axios from 'axios';


const ProductDetail = (props) => {
  
  
   
    return (
      <>
        <Container>
         <Productdetail productData={props.productData}/>
        </Container>
      </>
    )
  }
  
  export default ProductDetail;

  export async function getServerSideProps(context){
    const {params} = context;
    const {productDetail } = params
    const callProductData = await axios.get(`http://localhost:3000/api/products/detail?id=${productDetail}`)
    const productData = callProductData.data
    
    
    
    return {
      props: {productData}
    }
  }