import { useSelector, useDispatch }  from 'react-redux';

const CartItems = () => {
	
	const cartItems = useSelector(state => state.cartItems);

	return(
		<div>Shopping Cart</div>
	)
}

export default CartItems