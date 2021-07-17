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
const Products = (props) => {
    
    useEffect(() => {
        dispatch(getFilteredProducts(filters))
        return () => {
            dispatch(resetFilters())
        }
    }, [])
     
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const filters = useSelector(state => state.product.filters)
    const {productsOfOneUser} = props
    
    if(productsOfOneUser) {
        return(
            <CardsContainer>   
                {productsOfOneUser.map(p => <Product key={p._id} id = {p._id} user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} />)}
            </CardsContainer>
        )
    } 
        
    return (
        <CardsContainer>   
            {products && products.map(p => <Product key={p._id} id = {p._id} user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} />)}
        </CardsContainer>    
    )
}

export default Products;
