import Link from 'next/link';
import { useSelector, useDispatch }  from 'react-redux';
import { getProductDetail } from '../store/actions/productActions';
import styled from 'styled-components';
import { StyledLink } from './globalStyle';
import { HeartIcon as HeartIconOutline, ShoppingCartIcon as CartIconOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid, ShoppingCartIcon as  CartIconSolid } from '@heroicons/react/solid';
import {
    addItem,
    changeCart,
    buyProduct
} from '../store/actions/cartActions';
import { useEffect } from 'react';
import {
    getFavorites,
    handleFavorites 
} from '../store/actions/normalUsersActions'

//Component conteiner
const CardContainer = styled.div`
transition:  all 0.2s ease-out;
border: 1px solid ${(props) => props.theme.colorLevel4};


margin: 1rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 280px;
height:400px;
${'' /* box-shadow: 0 0 11px rgba(33,33,33,.2); */}
&:hover {
    box-shadow: 0 0 20px rgba(33,33,33,.2);
    ${'' /* transform: scale(1.1); */}
    background: ${(props) => props.theme.backgroundLevel2}
}
@media (max-width: 320px) {
    margin: 0.6rem 0;
    }
`





//Image container
const ImageContainer = styled.div`
background-image: url(${(props)=>props.imgUrl});
background-position:center;
backdrop-filter: brightness(1.5);
background-size:cover;

cursor: pointer;
border-bottom: 1px solid grey;
width:100%;
height:60%;
display:flex;
justify-content:center;
`
//ATENCION LO PONGO EN ESPAÑOL DIV MOMENTANEO HASTA QUE SAQUE COMO DAR BLUR SOLO A LA IMAGEN DE FONDO
const DivParaSafar = styled.div`
border: 4px solid white;

`
//Detail conteiner (Title, description, price, detail link, etc.) <-- it doesnt includes the img
const ContainerDetail = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
flex-wrap: wrap;
padding: 0 10%;
margin-bottom: 5%;
width:100%;
height:40%;
`
//Etiqueta img
const ProductImage =  styled.img`
height:100%;
max-width:100%;
`

//price title
const PriceTitle = styled.h3`
${'' /* font-size:1.5rem; */}
margin-bottom:5px;
cursor: pointer;

`
//card product title
const CardProductTitle = styled.h4`
${'' /* font-size:1.2rem; */}
margin-top: 10px;
cursor: pointer;

`

//Styled link button
const StyledButton = styled(StyledLink)`
margin-bottom: 5px;
color: #FF0000;
display: inline;
padding-right: 2px;
transition: 0.2s;

&:hover {
    color: #E10000;
    padding-right: 7px;
    transition: 0.2s;
}
`

const ArrowSpan = styled.span`
display: inline;
padding-left: 2px;
transition: 0.2s;
color: #FF0000;
&:hover {
    padding-left: 7px;
    transition: 0.2s;
}
`

// Over the image? No soo good
// const CardIconContainer = styled.div`
// position: absolute;
// display: flex;
// flex-direction: column;
// justify-content: space-between;
// height: 50px;
// top: 5px;
// right: 10px;
// `

const IconContainer = styled.div`
position: relative;
top: 2px;
background: ${(props) => props.theme.colorFont};
padding: 3px;
margin-right: 10px;
display: inline;
opacity: 0.5;
border-radius: 50%;
cursor: pointer;
&:hover {
    transition: 0.2s;
    opacity: 1;
}
`

const DontMove = styled.div`
position: relative;
`


  
const Product = (props) => {
    const userData = useSelector(state => state.user.userData.user);
    const cartItems = useSelector(state => state.cart.cartItems);

    const dispatch = useDispatch()
    const image= props.image[0];

    useEffect(() => {
        userData && dispatch(getFavorites(userData.id))
      }, [])

    const HandleToggleFavorite = () => {
        dispatch(getFavorites(userData.id))
        dispatch(handleFavorites(userData.id, props.id))
        dispatch(getFavorites(userData.id))
 
    }


    return (
        <>
                <CardContainer>
                <Link href={'/detail/[productDetail]'} as={`/detail/${props.id}` } passHref>
                    <ImageContainer imgUrl={image}>
                        <DivParaSafar>
                            {/* <img height="100%" src={props.image} ></img> */}
                            <ProductImage src={props.image[0]}></ProductImage>
                        </DivParaSafar>
                    </ImageContainer>
                    </Link>
                    <ContainerDetail>
                    <Link href={'/detail/[productDetail]'} as={`/detail/${props.id}` } passHref>
                        <div>
                            <PriceTitle>${props.price}</PriceTitle> 
                            <CardProductTitle> {props.title}  </CardProductTitle>
                        </div>
                    </Link>
                        <DontMove>
                            <IconContainer>
                                { 
                                userData && userData.favorites && userData.favorites.some(obj => obj._id === props.id) ? <HeartIconSolid onClick={HandleToggleFavorite} className="addFavIcon"/>
                                : userData ? <HeartIconOutline onClick={HandleToggleFavorite} className="addFavIcon"/> 
                                : <></>
                                }
                            </IconContainer>
                            <IconContainer>
                                { userData && cartItems[0] && cartItems.some(obj => obj.products[0]._id === props.id) ?
                                <CartIconSolid  className="addCartIcon"/> 
                                : <CartIconOutline className="addCartIcon"/>}
                            </IconContainer>
                            <Link href={'/detail/[productDetail]'} as={`/detail/${props.id}` } passHref>
                                <StyledButton onClick={() => dispatch(getProductDetail(props.id))}>ver detalle </StyledButton>
                            </Link><ArrowSpan>→</ArrowSpan>
                        </DontMove>
                    </ContainerDetail>
                </CardContainer>
            
        </>   
    )
}

export default Product;
