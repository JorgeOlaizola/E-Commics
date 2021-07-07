import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts } from '../store/actions/productActions'
import Product from './Product'


export default function Products () {
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    return (
        <div>
            <button onClick={() => dispatch(getProducts())}>Get Products</button>       
            {products && products.map(p => <Product image={p.image} title={p.title} price={p.price} description={p.description} />)}
        </div>    
    )
}