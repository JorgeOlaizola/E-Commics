import styled from 'styled-components'
import { useSelector, useDispatch }  from 'react-redux'
import { useEffect, useState } from 'react'
import { 
    getFilteredProducts,
    resetProductDetail,
    createQuestion    
} from '../store/actions/productActions'
import {
    handleFavorites
} from '../store/actions/normalUsersActions'
import {
    addItem,
    changeCart,
    buyProduct
} from '../store/actions/cartActions'
import { HeartIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import Image from 'next/image';
import { StyledLink, Input, GradientBorder } from './globalStyle';
import { useRouter } from 'next/router'
import axios from 'axios'
import { showModalAlert } from '../store/actions/modalAlertActions'



//Styled components

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
    @media (max-width: 900px) {
        
    }
`

const DetailContainer = styled.div`
    width: 90%;
    height: 90%;
    background: ${(props) => props.theme.backgroundLevel1};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 20px;
`

const ImageContainer = styled.div`
    width: 66%;
    min-width: 280px;
    height: 100%;
`

const ImageView = styled.div`   
    display: flex;
    justify-content: center;
`
const InfoContainer = styled.div`
    width: 33%;
    min-width: 280px;
    height: 90%;
    padding-left: 20px;
    @media (max-width: 914px) {
        width: 100%;
        padding: 0 16px;
    }
    
`

const Title = styled.h1`
    ${'' /* font-size: 2rem; */}
    ${'' /* font-weight: bold; */}
    margin-bottom: 30px;
    @media (max-width: 914px) {
        display: none;
    }
`

const ResponsiveTitle = styled.h1`
    ${'' /* font-size: 2rem; */}
    ${'' /* font-weight: bold; */}
    margin: 30px 0;
    display: none;
    @media (max-width: 914px) {
        display: block;
    }
`


const InfoTitle = styled.h2`
    ${'' /* font-size: 1.5rem; */}
    font-weight: bold;
    margin-bottom: 20px;
`

const InfoText = styled.p`
    font-size: 1.5rem;
    margin-bottom: 20px;
`

const Description = styled.p`
    margin-bottom: 20px;
    color: ${(props) => props.theme.colorLevel2}
`

const UserStyledLink = styled(StyledLink)`
    font-size: 1rem;
    text-decoration: underline;
`


const BuyButton = styled.button`
    width: 100%;
    height: 45px;
    margin: 10px 0;
    background-color: ${(props) => props.theme.blueColor};
    border: 1px solid ${(props) => props.theme.backgroundLevel1};
    border-style: hidden;
    color: #FFF;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: #123AC9;
        border: 1px solid ${(props) => props.theme.backgroundLevel1};
        transition: 0.3s;
    }
    &:active {
        background-color: ${(props) => props.theme.blueColorActive};
        border: 1px solid ${(props) => props.theme.backgroundLevel1};
    }
`

const Advertise = styled.p`
    color: ${(props) => props.theme.blueColor};
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const HurryAdvertise = styled.p`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const QuestionAdvertise = styled.div`
    color: ${(props) => props.theme.blueColor};
    font-size: 1.2rem;
    margin-top: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`

const AddingButton = styled.div`
    color: ${(props) => props.theme.blueColor};
    font-size: 1.2rem;
    margin-bottom: 10px;

    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.blueColorHover};
    }
    &:active {
        cursor: pointer;
        color: ${(props) => props.theme.blueColor};
    }
`

const Space = styled.div`
    height: 20px;
`

const QuestionsDiv = styled.div`
    max-width: 800px;
`

const QuestionsContainer = styled.div`
    width: 90%;
    min-width: 280px; 
    height: auto;
    padding: 10px;
    margin-top: 10px;
`

const Question = styled.div`
    width: 100%;
    ${'' /* background-color: #fff; */}
	padding: 15px 20px;
	font-size: 1.2rem;
    border: 1px solid ${(props) => props.theme.blueColor};
	border-radius: 8px 0px 8px 0;
    ${'' /* box-shadow:	0 5px 5px rgba(0, 0, 0, .3), 0 3px 2px rgba(0, 0, 0, .2); */}
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Answer = styled.div`
    margin-top: 10px;
    width: 80%;
    background-color: ${(props) => props.theme.blueColor};
    ${'' /* color: #FFF; */}
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
    width: 100%;
    ${'' /* background-color: #fff; */}
	padding: 5px 10px;
	font-size: 1rem;
    border: 1px solid ${(props) => props.theme.colorLevel3};
	border-radius: 8px 0px 8px 0;
    ${'' /* border-style: hidden; */}
    ${'' /* box-shadow:	0 5px 5px rgba(0, 0, 0, .3), 0 3px 2px rgba(0, 0, 0, .2); */}
`

const Separator = styled.div`
    width: 100%;
    height: 1px;
    margin-top: 20px;
    background-color: ${(props) => props.theme.blueColor};
`

const StyledImage = styled.img`
    margin-top: 30px;
    max-width: 100%;
    max-height: 800px;
`

const ProductDetail = ({productData}) => {
    const router = useRouter()
    const filters = useSelector(state => state.product.filters)
    const [question, setQuestion] = useState("");
    const dispatch = useDispatch()
   
    const userData = useSelector(state => state.user.userData.user);

    function handleChange(e) {
        setQuestion(e.target.value)
    }

   async function handleSubmit(event) {
        event.preventDefault();
        if(userData){
            const questionCreated = {
                content: question,
                user: userData?.id,
                product: productData._id,
            }
            try {
                const postQuestion = await axios.post('/api/questions', questionCreated);
                const questionData = await postQuestion.data
                if(questionData) {
                    dispatch(showModalAlert({show:true, message:"La pregunta se ah realizado con exito, te avisaremos cuando el vendedor responda, mientras tanto seguí disfrutando de e-commics"}))
                    setQuestion("")
                    document.body.style.overflow = ""
                } //
                
            } catch (error) {
                console.log(error)
            }


        }
    }

    const buy = ()=>{
        if(userData && userData.id){
            dispatch(buyProduct({user: userData.id, quantity: 1, product:productData  }))
        }
        else{
            alert("Debes iniciar sesion para comprar!")
        }
    }

    const handleCart = async () => {
        if(userData) {
            let orders = [
                    {
                        _id: productData.user._id,// vendedor
                        products:[
                            {
                            _id: productData._id,//producto
                            unit_price: productData.price,
                            title: productData.title,
                            quantity: 1,
                            image: productData.image,
                            stock: productData.stock
                            }
                        ]
                    }
                ]
            return dispatch(changeCart(userData.id, orders))
        }
        else{
            return dispatch(addItem(productData))
        }
    }

    const handleClick = (e, path) => {
        e.preventDefault();

        filters.user = productData.user._id;
        dispatch(getFilteredProducts(filters));
        console.log(filters);
        router.push(path)
    }
{/* <Link style={{textDecoration: 'underline'}} href={`/productsPerUser/[id]`} as={`/productsPerUser/${productData.user._id}` } passHref></Link> */}

    return (
        <Father>
            <DetailContainer>

                <ImageInfo>

                    <ImageContainer>
                        <Link passHref href="/search">
                            <StyledLink>← búsqueda</StyledLink>
                        </Link>
                        <ResponsiveTitle>{productData.title}</ResponsiveTitle>
                        <ImageView>
                            <StyledImage src={productData.image[0]}/>
                        </ImageView>
                    </ImageContainer>

                    <InfoContainer>
                        <Title>{productData.title}</Title>
                        <InfoText>${productData.price}</InfoText>
                        {
                            productData.stock === 0 ? <Advertise>No hay unidades disponibles por el momento</Advertise> :
                            productData.stock === 1 ? <Advertise>¡Queda una sola unidad!</Advertise> :
                            <Advertise>Quedan {productData.stock} unidades</Advertise>
                        }
                        <InfoTitle>Descripción</InfoTitle>
                        <Description>{productData.description}</Description>
                        <Description><strong>Vendido por: </strong> 
                            <UserStyledLink>
                                <button style={{textDecoration: 'underline'}} onClick={(e) => handleClick(e, "/search")} >
                                  {productData.user.nickname}
                                </button>
                            </UserStyledLink>
                        </Description>

                        <Description><strong>Categoría:</strong> {productData.category.title}</Description>

                        <BuyButton onClick={()=>buy()}>Comprar ahora</BuyButton>

                        <HurryAdvertise><em>Apúrate! Este artículo se va volando</em></HurryAdvertise>
                       {/*  {
                        userData && userData.favorites ? 
                            (userData.favorites.find(f => f.productId === detail._id) ?
                            <AddingButton><a onClick={() => dispatch(handleFavorites(userData.id, productData._id))}><HeartIcon className="addFavIcon"/> Quitar de favoritos</a></AddingButton> 
                            :
                            <AddingButton><a onClick={() => dispatch(handleFavorites(userData.id, productData._id))}><HeartIcon className="addFavIcon"/> Agregar a favoritos</a></AddingButton>)
                        : <span></span>
                        }  */}
                        {
                            userData && userData.favorites && userData.favorites.find(f => f.productId === detail._id) ? <AddingButton><a onClick={() => dispatch(handleFavorites(userData.id, productData._id))}><HeartIcon className="addFavIcon"/> Quitar de favoritos</a></AddingButton> :
                            userData && userData.favorites && userData.favorites.find(f => f.productId === detail._id) === undefined ? <AddingButton><a onClick={() => dispatch(handleFavorites(userData.id, productData._id))}><HeartIcon className="addFavIcon"/> Agregar a favoritos</a></AddingButton> :
                            <span></span>
                        } 
                        {/* <AddingButton><HeartIcon className="addFavIcon"/> Agregar a favoritos</AddingButton> */}

                        <AddingButton onClick={() => handleCart()}><ShoppingCartIcon className="addCartIcon"/> Agregar al carrito</AddingButton>
                        <Space/>
                        <InfoTitle>Medios de pago</InfoTitle>
                        <Description>
                        <Image 
                                src={'/medios-pago-mercado.png'} 
                                width={'280px'}
                                height={'71px'}
                                alt="logo"/>
                        </Description>
                    </InfoContainer>
                    <Separator/>
                </ImageInfo>
                
                <QuestionsDiv>
                    
                    <Space/>
                    <QuestionsContainer>
                        <Title>Preguntas</Title>
                        {
                        productData.questions.length ? 
                            productData.questions.map(q => { 
                                return <div key={q.created_at} style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <Question>
                                        {q.content}
                                        <span style={{marginTop: "10px", fontSize: "1rem", color: "${(props) => props.theme.blueColor}"}}>{q.avatar} {q.userNickname} ({q.created_at.slice(0, 10)}) {q.answer ? <span>(respondido)</span> : <span>(pendiente de respuesta)</span>}</span>
                                    </Question>
                                    {
                                        q.answer &&
                                        <Answer>
                                            {q.answer}
                                            <span style={{marginTop: "10px", fontSize: "1rem"}}>{productData.user.nickname}</span>
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
                            userData && userData.log !== false ?
                                <>
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    {productData.questions.length ? <QuestionAdvertise>¿Quieres saber más?</QuestionAdvertise> : <></>}
                                        <QuestionAdvertise>Pregúntale al vendedor</QuestionAdvertise>
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
                                    <GradientBorder>
                                        <Input type="submit">Preguntar</Input>
                                    </GradientBorder>
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
                </QuestionsDiv>

            </DetailContainer>
        </Father>
    )
}

export default ProductDetail


