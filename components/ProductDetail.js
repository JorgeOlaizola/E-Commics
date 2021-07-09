import styled from 'styled-components'
import { useSelector }  from 'react-redux'


const Father = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`

const DetailConteiner = styled.div`
border-radius: 1rem;
border: 1px solid grey;
width: 90%;
height: 90%;
background: white;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`


const ImageConteiner = styled.div`
width: 45%;
height: 90%;
`
const InfoConteiner = styled.div`
width: 45%;
height: 90%;
font-size: 1.5rem;
`

const ImageInfo = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: raw;
flex-wrap: wrap;
width: 100%;
height: 100%;
`


const ProductDetail = ({id}) => {
    
    const detail = useSelector(state => state.product.productDetail)
    console.log(detail)
    return (
        <Father>
            {detail && <DetailConteiner>
                <h1 style={{fontSize: '3rem'}}>{detail.title}</h1>
                <ImageInfo>
                    <ImageConteiner>
                    <img width="80%" src={detail.image}></img>
                    </ImageConteiner>
                    <InfoConteiner>
                        <p style={{ padding: '20px' }}>{detail.description}</p>
                        <span style={{ padding: '20px' }}>Precio: {detail.price}$</span>
                        <p style={{ padding: '20px' }}>Stock disponible: {detail.stock} unidades</p>
                        <p style={{ padding: '20px' }}>Categoría: {detail.category.title}</p>
                        <p style={{ padding: '20px' }}>Vendido por: {detail.user.nickname}</p>
                        <button style={{ padding: '20px' }}>Añadir al carrito</button> <br/>
                        <button style={{ padding: '20px' }}>Comprar</button>
                    </InfoConteiner>
                </ImageInfo>
            </DetailConteiner>}
        </Father>
    )
}

export default ProductDetail
