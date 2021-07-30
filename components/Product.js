import Link from 'next/link'; 
import { useSelector, useDispatch }  from 'react-redux';
import { getProductDetail } from '../store/actions/productActions';
import styled from 'styled-components';
import { StyledLink } from './globalStyle';
import { HeartIcon as HeartIconOutline, ShoppingCartIcon as CartIconOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid, ShoppingCartIcon as  CartIconSolid } from '@heroicons/react/solid';
import { MdRemoveShoppingCart } from 'react-icons/md';
import {
	removeItem,
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
position:relative;
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
const AlertDiscount = styled.div`
width:3rem;
height: 1.2rem;
color: white;
font-size: 0.5rem;

background-color: #FF0000;
z-index:15000;
position: absolute;
top: 0px;
right: 0px;
display:flex;
justify-content: center;
align-items:center;
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
const IconContainerNot = styled.div`
position: relative;
top: 2px;
background: ${(props) => props.theme.colorFont};
padding: 3px;
margin-right: 10px;
display: inline;
opacity: 0.5;
border-radius: 50%;
cursor: not-allowed;
`
const DontMove = styled.div`
position: relative;
`
const PriceDiscount = styled.del`
color: gray;
font-size: 1rem;
margin:0;
`
const InfoText = styled.div`
   width:100%;
   display:flex;
   align-items: center;
   
`
const PriceTitleDos = styled.h3`
margin-left:5px;

cursor: pointer;

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
    const handleToggleSolidCart = () => {
        if(userData) {
            let orders = [
                    {
                        _id: props.userID,// vendedor
                        products:[
                            {
                            _id: props.id,//producto
                            unit_price: props.price,
                            title: props.title,
                            quantity: -1,
                            image: props.image,
                            stock: props.stock
                            }
                        ]
                    }
                ]
            return dispatch(changeCart(userData.id, orders))
        }
        else{
            return dispatch(removeItem(props.userID, props.id))
        }
        // dispatch(removeItem(cartItems[index].products[0]._id, props.id))
    }

    const handleToggleOutlineCart = () => {

        if(userData) {
            let orders = [
                    {
                        _id: props.userID,// vendedor
                        products:[
                            {
                            _id: props.id,//producto
                            unit_price: props.price,
                            title: props.title,
                            quantity: 1,
                            image: props.image,
                            stock: props.stock
                            }
                        ]
                    }
                ]
            return dispatch(changeCart(userData.id, orders))
        }
        else{
         
            let productOrder = {
                user:{
                    _id:props.userID
                },
                _id: props.id,//producto
                price: props.price,
                title: props.title,
                image: props.image,
                stock: props.stock
            }
            return dispatch(addItem(productOrder))
        }
    }
    // productData && productData.discount > 0 ? <InfoText><PriceDiscount>${productData.realprice}</PriceDiscount> <br/> ${productData.price}</InfoText> 
    //                         : 
    //                         <InfoText>${productData.price}</InfoText>
    


    return (
        <>
                <CardContainer>
                    {props.discount !== 0 && <AlertDiscount><p style={{fontSize: '0.6rem'}} >Hoy %{props.discount}</p> </AlertDiscount>  }
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
                            {props.discount !== 0 ? (<InfoText><PriceDiscount>${props.realprice}</PriceDiscount>  <PriceTitleDos> ${props.price}</PriceTitleDos></InfoText>) 
                             : 
                          (<PriceTitle>${props.price}</PriceTitle>)} 
                            
                            <CardProductTitle> {props.title}  </CardProductTitle>
                        </div>
                    </Link>
                        <DontMove>
                            <IconContainer>
                                { 
                                userData && userData.favorites.length && userData.favorites.some(obj => obj._id === props.id) ? <HeartIconSolid onClick={HandleToggleFavorite} className="addFavIcon"/>
                                : userData ? <HeartIconOutline onClick={(e)=>HandleToggleFavorite()} className="addFavIcon"/> 
                                : <></>
                                }
                            </IconContainer>
                            {props.stock ?
                            <IconContainer>
                                {cartItems[0] && cartItems.some(obj => obj.products[0]._id === props.id ) ?
                                <CartIconSolid  onClick={handleToggleSolidCart} className="addCartIcon"/> 
                                : <CartIconOutline onClick={handleToggleOutlineCart} className="addCartIcon"/>}
                            </IconContainer>
                            :
                            <IconContainerNot>
                                <MdRemoveShoppingCart/>
                            </IconContainerNot>
                            }
                            <Link href={'/detail/[productDetail]'} as={`/detail/${props.id}` } passHref>
                                <StyledButton >ver detalle </StyledButton>
                            </Link><ArrowSpan>→</ArrowSpan>
                        </DontMove>
                    </ContainerDetail>
                </CardContainer>
            
        </>   
    )
}

export default Product;
