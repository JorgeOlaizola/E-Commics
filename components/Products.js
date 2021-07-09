import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getProducts } from '../store/actions/productActions'
import Product from './Product'


const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])
    return (
        <div>   
            {products && products.map(p => <Product id = {p._id} user={p.user.nickname} category={p.category.title} image={p.image} title={p.title} price={p.price} description={p.description} />)}
        </div>    
    )
}

export default Products;