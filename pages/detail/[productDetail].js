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
    const ABSOLUTE_URL = process.env.ABSOLUTE_URL
    
    // const callProductData = await axios.get(`https://e-commics.vercel.app/api/products/detail?id=${productDetail}`)
    const callProductData = await axios.get(`${ABSOLUTE_URL}/products/detail?id=${productDetail}`)
    console.log("este es el otro aca: ", callProductData.data)
    const productData = callProductData.data
    
    
    
    return {
      props: {productData}
    }
  }