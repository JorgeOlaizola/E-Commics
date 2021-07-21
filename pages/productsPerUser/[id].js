import axios from 'axios';
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


const ProductsPerUser = (props) => {
    const { userID, productsOfOneUser, infoUser} = props
    console.log("en todos los de un usuairo", infoUser)
    
    return (
        <Container>
            <UserDescriptionPanel>RUTA DEL BACK</UserDescriptionPanel>
            <FiltersProducts>
            <Filters userId={userID}/>
            <Products productsOfOneUser={productsOfOneUser}/>
            </FiltersProducts>

        </Container>
        
    )
}
    
export default ProductsPerUser;

export async function getServerSideProps(context){
    const {params} = context;
    const {id } = params;
    const callAllProductsOfOneUser = await axios.get(`https://e-commics.vercel.app/api/products?user=${id}`) 
    const callInfoUser = await axios.post(`https://e-commics.vercel.app/api/users`, {userID: id})
    return {
      props: {
          productsOfOneUser: callAllProductsOfOneUser.data,
          userID: id,
          infoUser: callInfoUser.data
      }
    }
  }
    
    
    
    

    




    
    
    