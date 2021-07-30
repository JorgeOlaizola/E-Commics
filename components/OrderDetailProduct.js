import styled from 'styled-components'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const ProductOrderConteiner = styled.div`
max-width: 600px;
display: flex;
align-items: center;
margin: 10px 0;
padding: 5px;
border: 1px solid ${(props) => props.theme.colorLevel1};
`

const ProductImg = styled.img`
width: auto;
height: 100px;
margin-right: 10px;
`

const ProductInfo = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
text-align: left;
padding: 5px;
`

const StyledButton = styled.button`
border: 1px solid ${(props) => props.theme.colorLevel1};
font-size: 14px;
background-color: transparent;
padding: 3px;
cursor: pointer;
&:hover{
    box-shadow: 2px 1px 1px rgb(0,0,0,0.5);
}
`

const StyledForm = styled.form`
width: 400px;
margin-top: 10px;
font-size: 14px;
display: flex;
justify-content: space-between;
`

const Space = styled.div`
height: 10px;
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
                            <h3><Link href={`/detail/${p._id}`} passHref >{p.title}</Link></h3>
                            <p>Unidades: {p.quantity}</p>
                            <p>Subtotal: ${p.quantity * p.unit_price}</p>
                            { userData && userData.id === orderProps.buyer._id &&  orderProps.status === 'Recibido' ? 
                            ( p.review === 'NoReview' ?
                            <p>
                             <StyledButton onClick={() => { setReview(!review) }}>Escribir reseña</StyledButton>
                                    
                             { review ? '': <StyledForm onSubmit={(e) => createReview(e, p._id)}>
                                 <textarea name="content" type="text" placeholder="Opinión" required style={{border:"1px solid #000"}}></textarea>
                                 <div style={{display:"flex",flexDirection:"column", alignItems:"center"}}>
                                 <input name="rating"  type="number" onChange={(e) => setStars(e.target.value)} max='5' min='1' placeholder="Puntaje" required style={{width:"50px", border:"1px solid #000"}}>
                                 </input>
                                 <p>{star.repeat(stars)}</p>
                                 </div>
                                <StyledButton type="submit" value="Enviar reseña">Enviar</StyledButton>
                             </StyledForm> }
                            </p> 
                            :
                            <p>Ya escribiste tu reseña sobre este artículo</p>
                            )
                        : <span></span>}
                    </ProductInfo>
            </ProductOrderConteiner>
    )
}

export default OrderDetailProduct