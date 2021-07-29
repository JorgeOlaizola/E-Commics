import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { getFilteredProducts, resetFilters } from '../store/actions/productActions'
import Product from './Product'
import styled from 'styled-components';
import PacmanLoader from "react-spinners/PacmanLoader";
import Pagination from '../components/Pagination';

const CardsContainer = styled.main`
grid-area: main;
display:flex;
flex-direction:row;
flex-wrap:wrap;
margin-left: 16px;
@media (max-width: 900px){
    justify-content:center;
    margin-left: 0px;
}
`

const UserXNoUser = styled.button`
margin-left: 20px;
background: ${(props) => props.theme.backgroundButton2};
color: ${(props) => props.theme.colorLevel2};
border: none;
cursor: pointer;
font-size: 0.75rem;
font-family: ubuntu;
font-weight: 300;
padding: 4px;
&:hover {
        color: ${(props) => props.theme.fontColor};
    }
`

const UserXnoUserSpan = styled.p`
font-size: 0.75rem;
font-family: ubuntu;
display: inline;
font-weight: 900;
padding: 0 8px;
`

const LoaderContainer = styled.div`
display: flex;
justify-content: center;
margin-top: 50px;
`

const Products = (props) => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const filters = useSelector(state => state.product.filters);
    const userData = useSelector(state => state.user.userData.user);
    const {productsOfOneUser} = props;
    
    // console.log(products)
    useEffect(() => {
        dispatch(getFilteredProducts(filters));
        return () => {
            dispatch(resetFilters());
        }
    }, [dispatch]
    )
    
    const handleNoUser = (e) => {
        e.preventDefault();
        filters.user= "";
        dispatch(getFilteredProducts(filters));
    }

    
    if(products === undefined) return (
        <LoaderContainer>
            <PacmanLoader color={"#FFE100"} css={{border: "1px solid black"}} size={40}/>
        </LoaderContainer>
    )

    return (
        
        <div>
            {filters.user? <UserXNoUser onClick={handleNoUser}> Productos del usuario {filters.user} <UserXnoUserSpan>X</UserXnoUserSpan> </UserXNoUser> : <></>}
            <CardsContainer>   
                
                {productsOfOneUser ? 
                productsOfOneUser.map(p => <Product key={p._id} id = {p._id} userID={p.user._id} user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} />) 
                :
                products.length !== 0 ? products.map(p => <Product key={p._id} stock={p.stock} id ={p._id} userID={p.user._id} user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} />)
                :
                <h2 >Lo siento nadie ha publicado lo que buscas</h2>    
                      
            }
            </CardsContainer>   
            { products.length !== 0 ? <Pagination /> : <></> }
        </div> 
    )
}

export default Products;

