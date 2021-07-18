import { useSelector, useDispatch }  from 'react-redux';
import Link from 'next/link'
import styled from 'styled-components';
import { 
	removeItem,
	decreaseItem,
	increaseItem,
	changeCart 
} from '../store/actions/cartActions'


const ItemConteiner = styled.div`
width: 70%;
height: 150px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin: auto;
border: 1px solid grey;
`
const CartItems = () => {
	
	const dispatch = useDispatch()
	const cartItems = useSelector(state => state.cart.cartItems);
	const userData = useSelector(state => state.user.userData.user);
	console.log(cartItems)
	let total = 0

	return(
		<div><h1>Shopping Cart</h1>

			{/* Si el usuario es invitado */}
			{ cartItems && cartItems.length ? <div> {cartItems.map(ci => {
				return ( <div key={ci._id}>
					{ ci.products.map(p => 
					{ { total += (p.unit_price * p.quantity) }
						return <ItemConteiner key={p._id}>
						<h3>{p.title}</h3>
						<span>Precio: {p.unit_price}$</span>
						<span>Cantidad: <button onClick={() => dispatch(decreaseItem(ci._id, p._id))}>-</button> {p.quantity} <button onClick={() => dispatch(increaseItem(ci._id, p._id, 1000))}>+</button></span>
						<span>ID producto: {p._id}</span>
						<button onClick={() => dispatch(removeItem(ci._id, p._id))}>Remove</button>
					</ItemConteiner>}
					)}
					
				</div>
			)
			})}

			
			<p>Total: {total}$</p>
			<Link href="/" passHref>Comprar ahora</Link>
			</div> : 'Todavía no agregaste nada al carrito'}


			<hr/>

			{/* Si el usuario esta logueado */}
			{ cartItems && cartItems.length ? <div> {cartItems.map(ci => {
				return ( <div key={ci._id}>
					{ ci.products.map(p => 
					{ { total += (p.unit_price * p.quantity) }
						return <ItemConteiner key={p._id}>
						<h3>{p.title}</h3>
						<span>Precio: {p.unit_price}$</span>
						<span>Cantidad: <button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: - 1}]}]))}>-</button> {p.quantity} <button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: 1}]}]))}>+</button></span>
						<span>ID producto: {p._id}</span>
						<button onClick={() => dispatch(changeCart('60ecf7b0ef20060e68fbebf2', [{...ci, products: [{...p, quantity: -p.quantity}]}]))}>Remove</button>
					</ItemConteiner>}
					)}
					
				</div>
			)
			})}

			
			<p>Total: {total}$</p>
			<Link href="/" passHref>Comprar ahora</Link>
			</div> : 'Todavía no agregaste nada al carrito'}
		</div>
	)
}

export default CartItems