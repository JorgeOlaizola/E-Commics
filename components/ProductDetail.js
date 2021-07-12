import styled from 'styled-components'
import { useSelector, useDispatch }  from 'react-redux'
import { useEffect } from 'react'
import { resetProductDetail } from '../store/actions/productActions'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import Link from 'next/link';

const Father = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const DetailConteiner = styled.div`
    width: 90%;
    height: 90%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`


const ImageConteiner = styled.div`
    width: 66%;
    height: 90%;
`
const InfoConteiner = styled.div`
    width: 33%;
    height: 90%;
    padding-left: 20px;
`

const MiddleBar = styled.div`
    width: 1px;
    height: 100%;
    background-color: #161D2F;
`

const Title = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 30px;
`

const InfoTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
`

const InfoText = styled.div`
    font-size: 1.5rem;
    margin-bottom: 20px;
`

const Description = styled.div`
    font-size: 1.2rem;
    margin-bottom: 20px;
`

const BuyButton = styled.div`
    width: 100%;
    height: 45px;
    margin: 10px 0;
    background-color: #161D2F;
    color: #FFF;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        box-shadow: 0 3px 3px 2px rgba(0,0,0,0.3);
    }
`

const Advertise = styled.div`
    color: #161D2F;
    font-size: 1.2rem;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const AddingButton = styled.div`
    color: #161D2F;
    font-size: 1.2rem;
    margin-bottom: 10px;
`

const Space = styled.div`
    height: 20px;
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
    useEffect(() => {
        return () => {
            dispatch(resetProductDetail())
        }
    }, [])
    const dispatch = useDispatch()
    const detail = useSelector(state => state.product.productDetail)
    return (
        <Father>
            {detail && <DetailConteiner>
                <ImageInfo>
                    <ImageConteiner>
                    <Link replace passHref href="/search">
                        <InfoTitle>&#60; búsqueda</InfoTitle>
                    </Link>
                    <img style={{marginTop: "30px", width: "80%"}} src={detail.image}></img>
                    </ImageConteiner>
                    <MiddleBar/>
                    <InfoConteiner>
                        <Title>{detail.title}</Title>
                        <InfoText>${detail.price}</InfoText>
                        <Description>Quedan {detail.stock} unidades</Description>
                        <InfoTitle>Descripción</InfoTitle>
                        <Description>{detail.description}</Description>
                        <Description><strong>Vendido por:</strong> {detail.user.nickname}</Description>
                        <Description><strong>Categoría:</strong> {detail.category.title}</Description>
                        <BuyButton>Comprar ahora</BuyButton>
                        <Advertise>Apúrate! Este artículo se va volando</Advertise>
                        <AddingButton><HeartIcon className="addFavIcon"/> Agregar a favoritos</AddingButton>
                        <AddingButton><ShoppingCartIcon className="addCartIcon"/> Agregar al carrito</AddingButton>
                        <Space/>
                        <InfoTitle>Medios de pago</InfoTitle>
                        <Description>Descripción</Description>
                    </InfoConteiner>
                </ImageInfo>
            </DetailConteiner>}
        </Father>
    )
}

export default ProductDetail
