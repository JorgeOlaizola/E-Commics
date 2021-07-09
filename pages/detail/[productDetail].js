import Container from '../../components/Container';
import Productdetail from '../../components/ProductDetail'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getProductDetail } from '../../store/actions/productActions';

const ProductDetail = () => {
  const router = useRouter()
  const dispatch = useDispatch()
    useEffect( () => {
        dispatch(getProductDetail(router.query.productDetail))
    }, [])

  const detail = useSelector(state => state.product.productDetail)
    return (
      <>
        <Container>
         {detail.category && <Productdetail id={router.query.productDetail}/>}
        </Container>
      </>
    )
  }
  
  export default ProductDetail;