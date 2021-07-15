import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getFilteredProducts} from '../../store/actions/productActions'
import Container from '../../components/Container'
import styled from 'styled-components';

import Filters from '../../components/Filters'
import Products from '../../components/Products';

const FiltersProducts = styled.div`
    margin:auto;
    margin-top: 20px;
    width:95%;
    height:100%;
    display: grid;
    grid-template-areas: "asideLeft main" ;
    grid-template-columns: 25% auto;
    @media (max-width: 900px){
    grid-template-columns: auto;
    grid-template-areas:
    "asideLeft"
    "main";
    justify-content:center;
    }



`
const UserDescriptionPanel = styled.div`
    width:95%;
    margin:auto;
    box-shadow: 0 0 11px rgba(33,33,33,.2);
    display:flex;
    justify-content:center;

`


const ProductsPerUser = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const filterMachine = useSelector(state => state.product.filters)
    const products = useSelector(state => state.product.products)
    
    const userID = {
        ...filterMachine,
        user: router.query.id
    }

    useEffect(()=>{
        dispatch(getFilteredProducts(userID))
    },[])
    

    

//<div onClick={dispatch()}></div>

    return (
        <Container>
            <UserDescriptionPanel>Aca va la descripción del usuario, hoy lo completo</UserDescriptionPanel>
            <FiltersProducts>
            <Filters userId={userID}/>
            <Products/>
            </FiltersProducts>

        </Container>
        
    )
}

export default ProductsPerUser;