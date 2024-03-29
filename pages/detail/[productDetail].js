import { useEffect } from 'react';
import Container from '../../components/Container';
import Productdetail from '../../components/ProductDetail'
import axios from 'axios';
import {getProductDetail} from '../../store/actions/productActions'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';


const ProductDetail = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  
   useEffect(()=>{
     dispatch(getProductDetail(router.query.productDetail))
   },[dispatch])
  
  const storeProductDetail = useSelector(state => state.product.productDetail)
 
    return (
      <>
        <Container>
         <Productdetail productData={props.productData} productStore = {storeProductDetail}/>
        </Container>
      </>
    )
  }
  
  export default ProductDetail;

  export async function getServerSideProps(context){
    const {params} = context;
    const {productDetail } = params
    const ABSOLUTE_URL = process.env.ABSOLUTE_URL
    
    const callProductData = await axios.get(`${ABSOLUTE_URL}/api/products/detail?id=${productDetail}`)
    //const callProductData = await axios.get(`${ABSOLUTE_URL}/products/detail?id=${productDetail}`)
    const productData = callProductData.data
    
    
    
    return {
      props: {productData}
    }
  }
