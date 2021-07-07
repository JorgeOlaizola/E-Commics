import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts } from '../store/actions/productActions'
import Product from './Product'


export default function Products () {
    useEffect(() => {
        dispatch(getProducts())
    }, [])
    const products = useSelector(state => state.product.products);
    const dispatch = useDispatch();
    return (
        <div>   
            {products && products.map(p => <Product user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} description={p.description} />)}
        </div>    
    )
}