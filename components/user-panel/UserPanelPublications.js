import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    resetFilters,
    searchByUser,
    getOwnProducts
} from '../../store/actions/productActions'
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'
import ImageSlider from '../ImageSlider.js';

const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 1024px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DataSection = styled.div`
    width: 60%;
    display: flex;
    margin: 20px 0;
    border-style: solid;
    border-width: 1px;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
`

const DataColumn = styled.div`
    width: 250px;
    margin: 10px;
`


const StyledButton = styled.button`
    width: 200px;
    margin-top: 5px;

`

const ProfileImg = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
`

//Products styles

const ProductConteiner = styled.div`
width: 70%;
height: 200px;
border: 1px solid grey;
display: flex;
padding: 30px;
margin: 10px;
border-radius: 0.5rem 0.5rem;
justify-content: start;
align-items: center;
`

//Product conteiner for the info
const ProductInfoConteiner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80%;
`

const UserPanelPublications = () => {
    const userData = useSelector(state => state.user.userData.user);
    const products = useSelector(state => state.product.ownProducts);
    const filters = useSelector(state => state.product.filters);
    const dispatch = useDispatch();

    // const userProducts= products.forEach(p => console.log(p.user._id))



    useEffect(() => {
        if(userData.log === false) {
            window.location.href = "/"
        }
        dispatch(getOwnProducts(userData.id))
        return () => {
            dispatch(resetFilters())
        }
}, []);
    return (
        <StyledContainer>
            Publicaciones
            <ImageSlider />
            {products && products.length > 0 ? products.map(p => 
                <ProductConteiner key={p._id}>
                    <ProfileImg src={p.image}>
                    </ProfileImg>
                    <ProductInfoConteiner>
                    <h3>{p.title} </h3>
                    <span> Precio: {p.price}$</span> 
                    <span> Categoría: {p.category.title}</span>
                    <span><button>Eliminar</button><button>Modificar</button></span>
                    </ProductInfoConteiner>
                </ProductConteiner>
            ) : <div>Todavía no tienes ningun producto</div> }
            <Link href="/addproduct" passHref >
                    <StyledButton>Crear publicacion</StyledButton>
            </Link>    
        </StyledContainer>
    )
}

export default UserPanelPublications;