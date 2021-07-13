import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getFilteredProducts, resetFilters } from '../store/actions/productActions'
import Product from './Product'
import styled from 'styled-components';

const CardsContainer = styled.main`
grid-area: main;
display:flex;
flex-direction:row;
flex-wrap:wrap;
margin:auto;
`
const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const filters = useSelector(state => state.product.filters)

    useEffect(() => {
        dispatch(getFilteredProducts(filters))
        return () => {
            dispatch(resetFilters())
        }
    }, [])
    return (
        <CardsContainer>   
            {products && products.map(p => <Product id = {p._id} user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} />)}
        </CardsContainer>    
    )
}

export default Products;