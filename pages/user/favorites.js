import Container from "../../components/Container"
import Product from "../../components/Product"
import  { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"

const Favorites = () => {

    const favorites = useSelector(state => state.user.userData.favorites)

    return (
        <>
        <Container>
        { favorites && favorites.length > 0 ? 
        <div>{favorites.map(f =>
            <Product image={[f.productImg]} title={f.productTitle} price={f.productPrice} id={f.productId}></Product>)}</div> :
        <div>Todavía no has agregado ningún producto a favoritos</div> }
        </Container>
        </>
    )}

export default Favorites