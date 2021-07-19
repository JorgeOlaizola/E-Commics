import { useSelector, useDispatch }  from 'react-redux';
import Link from 'next/link'
import styled from 'styled-components';
import { 
	removeItem,
	decreaseItem,
	increaseItem,
	changeCart 
} from '../../store/actions/cartActions'

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
background-color:black;
@media (max-width: 900px){
	height: 50%;
	width:100%;
}

`;

//titulo y actiones 

const TitleAndOption =styled.div`
width:60%;
height:100%;
diplay:flex;
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
& span {
	font-size:1.5rem;
}
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


const CartItems = () => {
	
	const dispatch = useDispatch()
	const cartItems = useSelector(state => state.cart.cartItems);
	const userData = useSelector(state => state.user.userData.user);
	
	let total = 0

	return(
		<CartContainer><h1>Shopping Cart</h1>

			
			{userData ? 
				 cartItems && cartItems.length ? <div> {cartItems.map(ci => {
					 console.log("en card",ci)
					return ( <div key={ci._id}>
						{ ci.products.map(p => 
						{ { total += (p.unit_price * p.quantity) }

							return <ItemConteiner key={p._id}>
								<ImageContainer></ImageContainer>
								<TitleAndOption>
									<ProductTitleContainer>
										<h3>{p.title}</h3>
									</ProductTitleContainer>
									
									<Options>
										<button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: -p.quantity}]}]))}>Remove</button>
									</Options>

									
								</TitleAndOption>
								<Quantity>
									<span>Cantidad</span>
									<div>
										<ButtonAction onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: - 1}]}]))}>-</ButtonAction> {p.quantity} <ButtonAction onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: 1}]}]))}>+</ButtonAction>

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
				<Link href="/" passHref>
					<BuyButtonAction>Comprar ahora</BuyButtonAction> 
					</Link>
				</div> : 'Todavía no agregaste nada al carrito'
				:
				cartItems && cartItems.length ? <div> {cartItems.map(ci => {
					return ( <div key={ci._id}>
						{ ci.products.map(p => 
						{ { total += (p.unit_price * p.quantity) }
							return <ItemConteiner key={p._id}>
										<ImageContainer></ImageContainer>
										<TitleAndOption>
											<ProductTitleContainer>
												<h3>{p.title}</h3>
											</ProductTitleContainer>
											<Options>
												<button onClick={() => dispatch(removeItem(ci._id, p._id))}>Remove</button>

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
	
				
				<p>Total: {total}$</p>
				<Link href="/" passHref>Comprar ahora</Link>
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