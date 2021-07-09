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
background: blue;
color: white;
`

const ImageInfo = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: raw;
width: 100%;
height: 100%;
`


const ProductDetail = ({id}) => {
    
    const detail = useSelector(state => state.product.productDetail)
    console.log(detail)
    return (
        <Father>
            {detail && <DetailConteiner>
                <h3>{detail.title}</h3>
                <ImageInfo>
                    <ImageConteiner>
                    <img width="80%" src={detail.image}></img>
                    </ImageConteiner>
                    <InfoConteiner>
                        <p>{detail.description}</p>
                        <span>{detail.price}$</span>
                        <p>Stock disponible: {detail.stock} unidades</p>
                        <p>Categoría: {detail.category.title}</p>
                        <p>Vendido por: {detail.user.nickname}</p>
                    </InfoConteiner>
                </ImageInfo>
            </DetailConteiner>}
        </Father>
    )
}

export default ProductDetail
