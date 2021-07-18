import { useSelector, useDispatch }  from 'react-redux';
import Link from 'next/link'
import styled from 'styled-components';

const ItemConteiner = styled.div`
width: 70%;
height: 100px;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
margin: auto;
border: 1px solid grey;
`
const CartItems = () => {
	
	
	const cartItems = useSelector(state => state.cart.cartItems);
	const userData = useSelector(state => state.user.userData.user);
	console.log(cartItems)
	let total = 0

	return(
		<div>Shopping Cart
			{ cartItems && cartItems.length ? <div> {cartItems.map(ci => {
				return ( <div key={ci._id}>
					{ ci.products.map(p => 
					{ { total += (p.unit_price * p.quantity) }
						return <ItemConteiner key={p._id}>
						<h3>{p.title}</h3>
						<span>Precio: {p.unit_price}$</span>
						<span>Cantidad: {p.quantity}</span>
						<span>ID producto: {p._id}</span>
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