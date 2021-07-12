import styled from 'styled-components'
import { useSelector, useDispatch }  from 'react-redux'
import { useEffect, useState } from 'react'
import { resetProductDetail } from '../store/actions/productActions'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import Link from 'next/link';

const Father = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ImageInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: top;
    flex-wrap: wrap;
    width: 100%;
    height: 100%;
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
    height: 100%;
`

const ImageView = styled.div`   
    display: flex;
    justify-content: center;
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

const BackLink = styled.a`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;

    &:hover {
        text-decoration: underline;
    }
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

const QuestionsContainer = styled.div`
    width: 66%;
    height: auto;
    padding: 10px;
    margin-top: 10px;
`

const Question = styled.div`
    max-width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: left;
    font-size: 1.2rem;
    background-color: #C0F0FF;
    border-radius: 5px;
    padding: 3px 5px;
    margin-bottom: 3px;
`

const Answer = styled.div`
    max-width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: right;
    font-size: 1.2rem;
    color: #fff;
    background-color: #161D2F;
    border-radius: 5px;
    padding: 3px 5px;
    margin-bottom: 3px;
`

const ProductDetail = ({id}) => {
    useEffect(() => {
        return () => {
            dispatch(resetProductDetail())
        }
    }, [])
    const [question, setQuestion] = useState("");
    const dispatch = useDispatch()
    const detail = useSelector(state => state.product.productDetail)
    const userData = useSelector(state => state.user.userData);

    function handleChange(e) {
        setQuestion(e.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <Father>
            {detail && <DetailConteiner>
                <Space/>
                <ImageInfo>
                    <ImageConteiner>
                        <Link replace passHref href="/search">
                            <BackLink>&#60; búsqueda</BackLink>
                        </Link>
                        <ImageView>
                            <img style={{marginTop: "30px", maxWidth: "100%", maxHeight: "800px"}} src={detail.image}></img>
                        </ImageView>
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
                <QuestionsContainer>
                    <Space/>
                    <Title>Preguntas</Title>
                    {/* ACA IRIA EL MAP DE LAS Q&A EN LUGAR DE LAS 2 LINEAS DE ABAJO */}
                    <Question>hola</Question>
                    <Answer>chau</Answer>
                    {
                        userData.log !== false ?
                            <form
                                onSubmit={(e) => {handleSubmit(e)}}
                            >
                            <textarea 
                                rows="3"
                                cols="50"
                                name="question"
                                value={question}
                                onChange={(e) => handleChange(e)}
                            />
                            <button type='submit'>Enviar</button>
                            </form>
                        :
                            null
                    }
                </QuestionsContainer>
                <QuestionsContainer>
                    <Space/>
                    <Title>Reseñas</Title>
                </QuestionsContainer>
            </DetailConteiner>}
        </Father>
    )
}

export default ProductDetail
