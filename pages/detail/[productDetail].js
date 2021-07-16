import Container from '../../components/Container';
import Productdetail from '../../components/ProductDetail'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getProductDetail } from '../../store/actions/productActions';
import axios from 'axios';

const ProductDetail = (props) => {
  //console.log("estoy en props",props.productData)
  const router = useRouter()
  const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getProductDetail(router.query.productDetail))
    }, [])

  const detail = useSelector(state => state.product.productDetail)
    return (
      <>
        <Container>
         {detail.category && <Productdetail id={router.query.productDetail} productData={props.productData}/>}
        </Container>
      </>
    )
  }
  
  export default ProductDetail;

  export async function getServerSideProps(context){
    const {params} = context;
    const {productDetail } = params
    //const res = await fetch(`http://localhost:3000/api/products/detail?id=${productDetail}`)
    const callProductData = await axios.get(`http://localhost:3000/api/products/detail?id=${productDetail}`)
    const productData = callProductData.data
    //console.log("aca en el serverside", productData)
    
    return {
      props: {productData}
    }
  }