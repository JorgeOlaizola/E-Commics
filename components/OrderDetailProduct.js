import styled from 'styled-components'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProductOrderConteiner = styled.div`
width: 70%;
border: 0.5px solid black;
padding: 1rem;
display: flex;
justify-content: center;
flex-direction: raw;
`

const ProductImg = styled.img`
width: auto;
height: 150px;
border: 1px solid black
`

const ProductInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center
padding: 5px;
`


const OrderDetailProduct = ({ p, orderProps }) => {

    
    const [review, setReview] = useState(true)
    const userData = useSelector(state => state.user.userData.user)
    const router = useRouter()
    const [stars, setStars] = useState(0)

    const createReview = (e, product) => {
        e.preventDefault()
        axios.post('/api/reviews', { user: userData.id, product, content: e.target.content.value, rating: e.target.rating.value, order: orderProps._id})
        .then(r => router.push(`/detail/${product}`))
        .catch(err => console.log(err))
        

    }

    let star = "⭐"

    return(
            <ProductOrderConteiner key={p._id}>
                      <ProductImg src={p.image[0]}></ProductImg>
                      <ProductInfo>
                            <span>Producto: <Link href={`/detail/${p._id}`} passHref >{p.title}</Link> __ Clickea el título para acceder al producto</span>
                            <span>Cantidad: {p.quantity}</span>
                            <span>Precio total: {p.quantity * p.unit_price}$</span>
                            { userData && userData.id === orderProps.buyer._id &&  orderProps.status === 'Recibido' ? 
                            ( p.review === 'NoReview' ?
                            <p>
                             <button onClick={() => { setReview(!review) }}>Dejar review</button>
                                    
                             { review ? '': <form onSubmit={(e) => createReview(e, p._id)}>
                                 <textarea name="content" type="text" placeholder="Opinión" required></textarea>
                                 <input name="rating"  type="number" onChange={(e) => setStars(e.target.value)} max='5' min='0' placeholder="Puntaje" required></input>
                                 <p>{star.repeat(stars)}</p>
                                <input type="submit" value="Enviar reseña" />
                             </form> }
                            </p> 
                            :
                            <span>Ya dejaste una reseña de este producto</span>
                            )
                        : <span></span>}
                    </ProductInfo>
            </ProductOrderConteiner>
    )
}

export default OrderDetailProduct