import styled from 'styled-components'
import { useSelector, useDispatch }  from 'react-redux'
import { useEffect, useState } from 'react'
import { 
    resetProductDetail,
    createQuestion    
} from '../store/actions/productActions'
import {
    handleFavorites
} from '../store/actions/normalUsersActions'
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

const BuyButton = styled.button`
    width: 100%;
    height: 45px;
    margin: 10px 0;
    background-color: #161D2F;
    border-style: hidden;
    color: #FFF;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        box-shadow: 0 3px 3px 2px rgba(0,0,0,0.3);
    }
`

const SendButton = styled.button`
    width: auto;
    height: auto;
    padding: 10px;
    margin-top: 10px;
    background-color: #161D2F;
    border-style: hidden;
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

const QuestionAdvertise = styled.div`
    color: #161D2F;
    font-size: 1.2rem;
    margin-top: 20px;
    margin-bottom: 10px;
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
    width: 80%;
    background-color: #fff;
	padding: 15px 20px;
	font-size: 1.2rem;
    border: 1px solid #000;
	border-radius: 15px 15px 15px 0;
    box-shadow:	0 5px 5px rgba(0, 0, 0, .3), 0 3px 2px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Answer = styled.div`
    margin-top: 10px;
    width: 80%;
    background-color: #161D2F;
    color: #FFF;
	padding: 15px 20px;
	font-size: 1.2rem;
    border: 1px solid #000;
	border-radius: 15px 0 15px 15px;
    box-shadow:	0 5px 5px rgba(0, 0, 0, .3), 0 3px 2px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

const StyledInput = styled.input`
    margin-top: 20px;
    width: 66%;
    background-color: #fff;
	padding: 5px 10px;
	font-size: 1.2rem;
	border-radius: 15px;
    border-style: hidden;
    box-shadow:	0 5px 5px rgba(0, 0, 0, .3), 0 3px 2px rgba(0, 0, 0, .2);
`

const Separator = styled.div`
    width: 100%;
    height: 1px;
    background-color: #161D2F;
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
        const questionCreated = {
            content: question,
            user: userData._id,
            product: detail._id,
        }
        event.preventDefault();
        dispatch(createQuestion(questionCreated, userData.nickname))
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
                    <InfoConteiner>
                        <Title>{detail.title}</Title>
                        <InfoText>${detail.price}</InfoText>
                        <Description>Quedan {detail.stock} unidades</Description>
                        <InfoTitle>Descripción</InfoTitle>
                        <Description>{detail.description}</Description>
                        <Description><strong>Vendido por:</strong> 
                            <Link href={`/productsPerUser/${detail.user._id}`} passHref replace>
                            {detail.user.nickname}
                            </Link>
                        </Description>

                        <Description><strong>Categoría:</strong> {detail.category.title}</Description>
                        <BuyButton>Comprar ahora</BuyButton>
                        <Advertise>Apúrate! Este artículo se va volando</Advertise>
                        { userData.favorites && userData.favorites.find(f => f.productId === detail._id) ?
                        <AddingButton><button onClick={() => dispatch(handleFavorites(detail._id, detail.image, detail.title, detail.price, userData._id))}><HeartIcon className="addFavIcon"/> Quitar de favoritos</button></AddingButton> 
                        :
                        <AddingButton><button onClick={() => dispatch(handleFavorites(detail._id, detail.image, detail.title, detail.price, userData._id))}><HeartIcon className="addFavIcon"/> Agregar a favoritos</button></AddingButton>
                        }
                        <AddingButton><ShoppingCartIcon className="addCartIcon"/> Agregar al carrito</AddingButton>
                        <Space/>
                        <InfoTitle>Medios de pago</InfoTitle>
                        <Description>Descripción</Description>
                    </InfoConteiner>
                </ImageInfo>
                <Separator/>
                <QuestionsContainer>
                    <Space/>
                    <Title>Preguntas</Title>
                    {
                    detail.questions.length ? 
                        detail.questions.map(q => { 
                            return <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <Question>
                                    {q.content}
                                    <span style={{marginTop: "10px", fontSize: "1rem", color: "#161D2F"}}>Pregunta de {q.userNickname} ({q.created_at}) {q.answer ? <span>(respondido)</span> : <span>(pendiente de respuesta)</span>}</span>
                                </Question>
                                {
                                    q.answer &&
                                    <Answer>
                                        {q.answer}
                                        <span style={{marginTop: "10px", fontSize: "1rem", color: "#FFF"}}>Respuesta de {detail.user.nickname}</span>
                                    </Answer>
                                }
                                <Space/>
                            </div>        
                        })
                    : 
                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <QuestionAdvertise>Todavía no se ha realizado ninguna pregunta en esta publicación ¡Se el primero!</QuestionAdvertise>
                        </div>
                            
                    }
                    {
                        userData.log !== false ?
                            <>
                                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <QuestionAdvertise>Dejanos tus preguntas aquí, responderemos cuanto antes.</QuestionAdvertise>
                                </div>
                                <form
                                    style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
                                    onSubmit={(e) => {handleSubmit(e)}}
                                >
                                <StyledInput 
                                    rows="3"
                                    cols="50"
                                    name="question"
                                    value={question}
                                    onChange={(e) => handleChange(e)}
                                />
                                <SendButton type='submit'>Enviar</SendButton>
                                </form>
                            </>
                        :
                            <>
                                <Space/>
                                <Advertise style={{textAlign: "center"}}>Para realizar preguntas primero debes iniciar sesión. ¿Aún no tienes una cuenta de Ecommics? ¿Qué estás esperando?</Advertise>
                            </>
                    }
                </QuestionsContainer>
                <QuestionsContainer>
                    <Space/>
                    <Title>Reseñas</Title>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Advertise style={{textAlign: "center"}}>Aún no hay reseñas para este artículo</Advertise>
                    </div>
                </QuestionsContainer>
            </DetailConteiner>}
        </Father>
    )
}

export default ProductDetail
