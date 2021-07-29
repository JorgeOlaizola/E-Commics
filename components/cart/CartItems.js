import { useSelector, useDispatch }  from 'react-redux';
import { useEffect } from 'react'
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

import { EraseButton, BuyButton  } from '../globalStyle'


const CartContainer = styled.div`
padding:1.2rem;
& p{
	font-size:2rem;
}
`;
//container de cards
const ItemConteiner = styled.div`
width: 90%;
height: 150px;
display: flex;
align-items: center;
border: 1px solid grey;
margin:1rem auto;

@media (max-width: 900px){
	flex-direction:column;
	height: 450px;
	
	
}
`
const ImageContainer = styled.div`
width:20%;
height:100%;
display:flex;
justify-content:center;
background-color:black;
@media (max-width: 900px){
	height: 50%;
	width:100%;
}

`;
const CartItemImage =  styled.img`
height:100%;
width:auto;
max-width:100%;
`

//titulo y ACTIONES 

const TitleAndOption =styled.div`
width:60%;
height:100%;
display:flex;
flex-direction:columns;
justify-content: space-around;
padding-left:1rem;
@media (max-width: 900px){
	width:100%;
	height:20%;
}
`;
const ProductTitleContainer = styled.div`
height:50%;
display:flex;
align-items:center;
`;
const Options = styled.div`
height:40%;
display:flex;
align-items:flex-end;
`;
const Quantity = styled.div`
width:10%;
height:100%;
display:flex;
flex-direction:column;
align-items:center;
justify-content:space-around;
@media (max-width: 900px){
	width:100%;
	height:15%;
	& span{
		display: none;
	}
	
}

`;
const UnitPrice = styled.div`
width:8%;
display:flex;
justify-content:flex-end;
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

`;
const ButtonAction = styled.button`
border: 1px solid grey;

&:hover {
	box-shadow: 0 3px 3px 2px rgba(0,0,0,0.3);
}

`;

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
		<CartContainer><h1>Shopping Cart</h1>

			
			{userData ? 
				 cartItems && cartItems.length ? <div> {cartItems.map(ci => {
					return ( <div key={ci._id}>
						{ ci.products?.map(p => 
						{ { total += (p.unit_price * p.quantity) }

							return <ItemConteiner key={p._id}>
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
									<span>Cantidad</span>
									Stock restante: {p.stock - p.quantity}
									<div>
										
										<ButtonAction onClick={() => dispatch(changeCart(userData.id, [{...ci, products: [{...p, quantity: - 1}]}]))}>-</ButtonAction> {p.quantity} <ButtonAction onClick={() => dispatch(changeCart(userData.id, [{...ci, products: [{...p, quantity: 1}]}]))}>+</ButtonAction>

									</div>

								</Quantity>
								<UnitPrice>
									<span>$ {p.unit_price}</span>
								</UnitPrice>



							{/* <span>ID producto: {p._id}</span> */}
						</ItemConteiner>}
						)}
						
					</div>
				)
				})}
	
				

				<p>Total: {total}$</p>
				<ShippingForm/>
				{
					shippingInfo && <BuyButtonAction  onClick={shippingInfo ? ()=> dispatch(buyCart(cartId, shippingInfo)) : null}>Pagar ahora</BuyButtonAction>
				}
				

					{/* <BuyButtonAction display={!!shippingInfo ? 'none' : 'flex'} onClick={shippingInfo ? ()=> dispatch(buyCart(cartId, shippingInfo)) : null}>Comprar ahora</BuyButtonAction>  */}
				

				</div> : 'Todavía no agregaste nada al carrito'
				:
				cartItems && cartItems.length ? <div> {cartItems.map(ci => {
					return ( <div key={ci._id}>
						{ ci.products?.map(p => 
						{ { total += (p.unit_price * p.quantity) }
							return <ItemConteiner key={p._id}>
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
											<button onClick={() => dispatch(decreaseItem(ci._id, p._id))}>-</button> {p.quantity} <button onClick={() => dispatch(increaseItem(ci._id, p._id, 1000))}>+</button>
											<span>Cantidad:</span>
										</Quantity>
										<UnitPrice>
											<span>$ {p.unit_price}</span>

										</UnitPrice>
						</ItemConteiner>}
							

							
						)}
						
					</div>
				)
				})}
	
				
				<h3>Total: ${total}</h3>
				<h4>Para adquirir productos por favor puedes hacer click en <strong>Crear cuenta</strong> o <strong>Ingresar</strong> desde el panel de usuario</h4>
				</div> : 'Todavía no agregaste nada al carrito'
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
// 						return <ItemConteiner key={p._id}>
// 						<h3>{p.title}</h3>
// 						<span>Precio: {p.unit_price}$</span>
// 						<span>Cantidad: <button onClick={() => dispatch(decreaseItem(ci._id, p._id))}>-</button> {p.quantity} <button onClick={() => dispatch(increaseItem(ci._id, p._id, 1000))}>+</button></span>
// 						<span>ID producto: {p._id}</span>
// 						<button onClick={() => dispatch(removeItem(ci._id, p._id))}>Remove</button>
// 					</ItemConteiner>}
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
// 						return <ItemConteiner key={p._id}>
// 						<h3>{p.title}</h3>
// 						<span>Precio: {p.unit_price}$</span>
// 						<span>Cantidad: <button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: - 1}]}]))}>-</button> {p.quantity} <button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: 1}]}]))}>+</button></span>
// 						<span>ID producto: {p._id}</span>
// 						<button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: -p.quantity}]}]))}>Remove</button>
// 					</ItemConteiner>}
// 					)}
					
// 				</div>
// 			)
// 			})}

			
// 			<p>Total: {total}$</p>
// 			<Link href="/" passHref>Comprar ahora</Link>
// 			</div> : 'Todavía no agregaste nada al carrito'}
