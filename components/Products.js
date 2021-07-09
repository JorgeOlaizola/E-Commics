import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts } from '../store/actions/productActions'
import Product from './Product'
import styled from 'styled-components';

const CardsContainer = styled.div`

display:flex;
flex-direction:row;
flex-wrap:wrap;
`
const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <CardsContainer>   
            {products && products.map(p => <Product id = {p._id} user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} description={p.description} />)}
        </CardsContainer>    
    )
}

export default Products;