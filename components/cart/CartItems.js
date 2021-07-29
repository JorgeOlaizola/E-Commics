import { useSelector, useDispatch }  from 'react-redux';
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components';
import { 
	removeItem,
	decreaseItem,
	increaseItem,
	changeCart,
	getCart,
	buyCart

} from '../../store/actions/cartActions'
import ShippingForm from './ShippingForm';

import { EraseButton, BuyButton, StyledLink  } from '../globalStyle'


const CartContainer = styled.div`
padding:1.2rem;
& p{
	font-size:1rem;
}
`;
//container de cards
const ItemContainer = styled.div`
width: 90%;
height: 150px;
display: flex;
align-items: center;
border: 1px solid grey;
margin:1rem auto;
padding: 12px 24px; 

@media (max-width: 620px){
	flex-direction:column;
	height: 450px;
	padding: 12px 12px; 
}
`
const ImageContainer = styled.div`
width:30%;
height:100%;
display:flex;
justify-content:center;
background-color:black;
@media (max-width: 620px){
	height: 50%;
	width:100%;
}
`

const CartItemImage =  styled.img`
height:100%;
width:auto;
`

//titulo y ACTIONES 

const TitleAndOption =styled.div`
width:60%;
height:100%;
diplay:flex;
flex-direction:column;
justify-content: space-around;
padding-left:1rem;
@media (max-width: 620px){
	width:100%;
	height:20%;
}
`

const ProductTitleContainer = styled.div`
height:50%;
display:flex;
align-items:center;
@media (max-width: 620px){
	margin-top: 12px;
}
`

const Options = styled.div`
height:40%;
display:flex;
align-items:flex-end;
`

const Quantity = styled.div`
width:60%;
height:100%;
display:flex;
flex-direction:column;
align-items: flex-end;
justify-content:space-around;
@media (max-width: 620px){
	width:100%;
	height:15%;
	& span{
		display: none;
	}
	margin-top:48px;
	
}
`

const UnitPrice = styled.div`
display:flex;
justify-content:flex-start;
padding-right:1rem;
@media (max-width: 900px){
	background-color: #161D2F;
	width:100%;
	color:white;
	height:15%;
	align-items: center;
	
	& span {
		font-size:2rem;
	}
}
`

const ButtonAction = styled.button`
border: 1px solid grey;

&:hover {
	box-shadow: 0 3px 3px 2px rgba(0,0,0,0.3);
}
`

const BuyButtonAction = styled.button`
	width: 100%;
    height: 45px;
    margin: 10px 0;
    background-color: #161D2F;
    border-style: hidden;
    color: #FFF;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        box-shadow: 0 3px 3px 2px rgba(0,0,0,0.3);
    }
`
const FormStyled = styled.form`
width:100%;
border-top: 1px solid black;
border-bottom: 1px solid black;
margin-top: 1rem;
margin-bottom: 1rem;
`

const InputStyled = styled.input`
height: 1rem;
`



const CartItems = () => {
	const [sendState, setsendState] = useState(false);
	const userData = useSelector(state => state.user.userData.user);
	const dispatch = useDispatch()
	useEffect(() => {
		if(userData) {
			dispatch(getCart(userData.id))
		}
	}, [dispatch, userData])
	const cartItems = useSelector(state => state.cart.cartItems);
	const cartId = useSelector(state => state.cart.cartId);
	const shippingInfo = useSelector(state => state.cart.shippingInfo)
	
	let total = 0
	return(
		<CartContainer><h1 style={{margin: '0 5%'}}>Shopping Cart</h1>

			
			{userData ? 
				 cartItems && cartItems.length ? <div> {cartItems.map(ci => {
					return ( <div key={ci._id}>
						{ ci.products?.map(p => 
						{ { total += (p.unit_price * p.quantity) }

							return <ItemContainer key={p._id}>
								<ImageContainer>
								<CartItemImage src={p.image[0]}></CartItemImage>
								</ImageContainer>
								<TitleAndOption>
									<ProductTitleContainer>
										<h3>{p.title}</h3>
									</ProductTitleContainer>
									
									<Options>
										<EraseButton onClick={() => dispatch(changeCart(userData.id, [{...ci, products: [{...p, quantity: -p.quantity}]}]))}>Eliminar producto</EraseButton>
									</Options>

									
								</TitleAndOption>
								<Quantity>
									<p><strong>Stock restante:</strong> {p.stock - p.quantity}</p>
									
									<div>
										<p style={{display: "inline"}}><strong>Cantidad</strong> </p>
										<ButtonAction onClick={() => dispatch(changeCart(userData.id, [{...ci, products: [{...p, quantity: - 1}]}]))}>-</ButtonAction> {p.quantity} <ButtonAction onClick={() => dispatch(changeCart(userData.id, [{...ci, products: [{...p, quantity: 1}]}]))}>+</ButtonAction>
										
									</div>


								
									<p><strong>Precio unitario:</strong> $ {p.unit_price}</p>
									</Quantity>


							{/* <span>ID producto: {p._id}</span> */}
						</ItemContainer>}
						)}
						
					</div>
				)
				})}
	
				
				<div style={{margin: '0 5%'}}>
					
					<h3 >Total: ${total}</h3>
					{shippingInfo && !sendState ? <><hr /><h3>Tus datos de envío están cargados correctamente</h3></> : <ShippingForm />} 
					{!shippingInfo ? <></> : !sendState ? <StyledLink onClick={()=>setsendState(true)} >Cargar nueva dirección?</StyledLink> : 
					<StyledLink onClick={()=>setsendState(false)}>Ocultar formulario</StyledLink>
					}
					{
						shippingInfo && <BuyButton onClick={shippingInfo ? ()=> dispatch(buyCart(cartId, shippingInfo)) : null} >Comprar ahora</BuyButton>
					}
				</div>
				

					{/* <BuyButtonAction display={!!shippingInfo ? 'none' : 'flex'} onClick={shippingInfo ? ()=> dispatch(buyCart(cartId, shippingInfo)) : null}>Comprar ahora</BuyButtonAction>  */}
				

				</div> : <p style={{margin: '36px'}}>Todavía no agregaste nada al carrito</p>
				:
				cartItems && cartItems.length ? <div> {cartItems.map(ci => {
					return ( <div key={ci._id}>
						{ ci.products?.map(p => 
						{ { total += (p.unit_price * p.quantity) }
							return <ItemContainer key={p._id}>
										<ImageContainer>
										<CartItemImage src={p.image[0]}></CartItemImage>
										</ImageContainer>
										<TitleAndOption>
											<ProductTitleContainer>
												<h3>{p.title}</h3>
											</ProductTitleContainer>
											<Options>
												<EraseButton onClick={() => dispatch(removeItem(ci._id, p._id))}>Eliminar producto</EraseButton>

											</Options>

										</TitleAndOption>
										<Quantity>
										<p><strong>Stock restante:</strong> {p.stock - p.quantity}</p>
										<di>
											
											<p style={{display: "inline"}}><strong>Cantidad</strong> </p>
												<ButtonAction onClick={() => dispatch(decreaseItem(ci._id, p._id))}>-</ButtonAction> {p.quantity} <ButtonAction onClick={() => dispatch(increaseItem(ci._id, p._id, 1000))}>+</ButtonAction>
											
										</di>
									
											<p><strong>Precio unitario:</strong> $ {p.unit_price}</p>
										</Quantity>			
									
						</ItemContainer>}
							

							
						)}
						
					</div>
				)
				})}
	
				
				<h3  style={{margin: '0 5%'}}>Total: ${total}</h3>
				<h4  style={{marginLeft: '5%'}}>Para adquirir productos puedes hacer click en <strong>Crear cuenta</strong> o <strong>Ingresar</strong> desde el panel de usuario</h4>
				</div> : <p style={{margin: '48px'}}>Todavía no agregaste nada al carrito</p>
				}
			{/* Si el usuario es invitado */}	

			
		</CartContainer>
	)
}

export default CartItems

//el codigo anterior

// { cartItems && cartItems.length ? <div> {cartItems.map(ci => {
// 				return ( <div key={ci._id}>
// 					{ ci.products.map(p => 
// 					{ { total += (p.unit_price * p.quantity) }
// 						return <ItemContainer key={p._id}>
// 						<h3>{p.title}</h3>
// 						<span>Precio: {p.unit_price}$</span>
// 						<span>Cantidad: <button onClick={() => dispatch(decreaseItem(ci._id, p._id))}>-</button> {p.quantity} <button onClick={() => dispatch(increaseItem(ci._id, p._id, 1000))}>+</button></span>
// 						<span>ID producto: {p._id}</span>
// 						<button onClick={() => dispatch(removeItem(ci._id, p._id))}>Remove</button>
// 					</ItemContainer>}
// 					)}
					
// 				</div>
// 			)
// 			})}

			
// 			<p>Total: {total}$</p>
// 			<Link href="/" passHref>Comprar ahora</Link>
// 			</div> : 'Todavía no agregaste nada al carrito'}


// 			<hr/>

// 			{/* Si el usuario esta logueado */}
// 			{ cartItems && cartItems.length ? <div> {cartItems.map(ci => {
// 				return ( <div key={ci._id}>
// 					{ ci.products.map(p => 
// 					{ { total += (p.unit_price * p.quantity) }
// 						return <ItemContainer key={p._id}>
// 						<h3>{p.title}</h3>
// 						<span>Precio: {p.unit_price}$</span>
// 						<span>Cantidad: <button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: - 1}]}]))}>-</button> {p.quantity} <button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: 1}]}]))}>+</button></span>
// 						<span>ID producto: {p._id}</span>
// 						<button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: -p.quantity}]}]))}>Remove</button>
// 					</ItemContainer>}
// 					)}
					
// 				</div>
// 			)
// 			})}

			
// 			<p>Total: {total}$</p>
// 			<Link href="/" passHref>Comprar ahora</Link>
// 			</div> : 'Todavía no agregaste nada al carrito'}
