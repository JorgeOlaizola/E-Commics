import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts } from '../store/actions/productActions'
import Product from './Product'


export default function Products () {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    return (
        <div>   
            {products && products.map(p => <Product user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} description={p.description} />)}
        </div>    
    )
}