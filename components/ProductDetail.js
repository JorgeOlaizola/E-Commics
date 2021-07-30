//#region Imports
import styled from 'styled-components'
import { useSelector, useDispatch }  from 'react-redux'
import { useEffect, useState } from 'react'
import { 
    getFilteredProducts,
    resetProductDetail,
    createQuestion,
    productToUpDate   
} from '../store/actions/productActions'
import {
    handleFavorites,
    getFavorites
} from '../store/actions/normalUsersActions'
import {
    addItem,
    changeCart,
    buyProduct,
    getCart,
	decreaseItem,
	increaseItem,
} from '../store/actions/cartActions'
import Link from 'next/link';
import Image from 'next/image';
import { StyledLink, Input, GradientBorder, BuyButton, EraseButton } from './globalStyle';
import { useRouter } from 'next/router'
import axios from 'axios'
import { showModalAlert } from '../store/actions/modalAlertActions'
import ImageCarousel from './ImageCarousel'
import { AiFillEdit } from 'react-icons/ai';
import { AiOutlineEdit } from 'react-icons/ai';
import {FormProductContainer, FormInput, FormTextarea, FormProductInput} from './user-panel/UserStyles.js';
import { HeartIcon as HeartIconOutline, ShoppingCartIcon as CartIconOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartIconSolid, ShoppingCartIcon as  CartIconSolid } from '@heroicons/react/solid';

//#endregion

//#region Estilos



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
        ${'' /* display: none; */}
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

const CartAddingButton = styled.div`
    color: ${(props) => props.theme.blueColor};
    font-size: 1.2rem;
    margin-bottom: 10px;
    display: inline;

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
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
`

const QuestionsContainer = styled.div`
    width: 60%;
    min-width: 280px; 
    height: auto;
    padding: 10px;
    margin-top: 10px;
    @media (max-width: 777px) {
        width: 100%;
    }
`

const ReviewsContainer = styled.div`
    width: 36%;
    max-width: 400px;
    min-width: 280px; 
    height: auto;
    padding: 10px;
    margin-top: 10px;
    border-left: 1px solid ${(props) => props.theme.blueColor};
    padding-left: 40px;
    @media (max-width: 777px) {
        width: 100%;
        max-width: 100%;
        border-left: none;
        padding-left: 0px;

    }
`

const Question = styled.div`
    width: 100%;
    ${'' /* background-color: #fff; */}
	padding: 15px 20px;
	font-size: 1.2rem;
    border: 1px solid ${(props) => props.theme.blueColorActive};
	border-radius: 5px 0px 0px 0;
    margin-top: 20px;

`

const Answer = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.backgroundQA};
    ${'' /* color: #FFF; */}
	padding: 15px 20px;
	font-size: 1.2rem;
	border-radius: 0px 0 5px 0px;

`

const StyledInput = styled.input`
    margin-right: 4px;
    width: 100%;
    ${'' /* background-color: #fff; */}
	padding: 5px 10px;
	font-size: 1rem;
    border: 1px solid ${(props) => props.theme.colorLevel3};
    ${'' /* border-style: hidden; */}
    ${'' /* box-shadow:	0 5px 5px rgba(0, 0, 0, .3), 0 3px 2px rgba(0, 0, 0, .2); */}
    background: ${(props) => props.theme.backgroundLevel1};
    color: ${(props) => props.theme.fontColor};
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

//Category 
const DetailSelectCategories = styled.select`
display: block;
padding: 0 10px;
outline: none;
border-radius: 2px;
width: 100%;
`

const DetailCategoryOption = styled.option`
display: block;
padding: 0 10px;
outline: none;
border-radius: 2px;
width: 100%;
`
//#endregion

const EditActiveButton = styled.button`
background: ${(props) => props.theme.backgroundLevel1};
border: none;
border: 1px solid ${(props) => props.theme.fontColor};
border-bottom: 1px solid ${(props) => props.theme.backgroundLevel1};
z-index: 10;
position: relative;
top: 1px;
left: 10px;
padding: 5px 10px;
cursor: pointer;
color: ${(props) => props.theme.fontColor};
&:hover {
    opacity: ${(props) => props.theme.backgroundSwitch};
    transition: 0.2s;
    text-decoration: underline;
}
`

const EditInactiveButton = styled(EditActiveButton)`
background: ${(props) => props.theme.colorLevel4};
border: 1px solid ${(props) => props.theme.backgroundLevel1};
border-bottom: 1px solid ${(props) => props.theme.fontColor};
`

const DivLine = styled.div`
border-Bottom: 1px solid ${(props) => props.theme.colorLevel3};
z-index: 9;
margin-bottom: 10px;
`

const ReviewConteiner = styled.div`
display: flex;
justify-content: center;
align-items: center;
border-bottom: 1px solid ${(props) => props.theme.colorLevel2};
padding: 1rem;
margin: 1rem;
flex-direction: column;
`



const ProductDetail = ({productData}) => {

    const router = useRouter()
    const dispatch = useDispatch()
    const filters = useSelector(state => state.product.filters)
    const userData = useSelector(state => state.user.userData.user);
    const categories = useSelector(state => state.category.categories)
    const [question, setQuestion] = useState("");
    const [edit,setEdit] = useState(false)
    const [productUpDate,setProductUpDate] = useState({
        ...productData
    })
	const cartItems = useSelector(state => state.cart.cartItems);

    function handleChange(e) {
        setQuestion(e.target.value)
    }

    function handleProductUpDate(e) {
        e.preventDefault()
        setProductUpDate({
            ...productUpDate,
            [e.target.name]: e.target.value
        })
    }
    function handleProductUpDateCategory(e){
        e.preventDefault()
        setProductUpDate({
            ...productUpDate,
            category:{
                ...productUpDate.category,
                _id: e.target.value
            }
        })
    }
    function removeImage(img){
        if(productUpDate.image.length <= 1){
            return
        }
        setProductUpDate({
            ...productUpDate,
            image: productUpDate.image.filter((image)=> img !== image)
        })
    }
    function handleEdit(){
        setEdit(!edit)
        //se puede dejar o sacar a gusto de los compas!
        setProductUpDate({
            ...productData
        })
    }
    async function upDateProduct(){
        dispatch(productToUpDate(productUpDate))
        setEdit(!edit)
        alert('Producto modificado con éxito!')
        return router.push(`/detail/${productData._id}`)
    }


   async function handleSubmit(event) {

        event.preventDefault();
        if(userData){
            const questionCreated = {
                content: question,
                user: userData?.id,
                product: productData._id,
            }
            dispatch(createQuestion(questionCreated, userData?.nickname))

            /* try {
                const postQuestion = await axios.post('/api/questions', questionCreated);
                const questionData = await postQuestion.data
                if(questionData) {
                    dispatch(showModalAlert({show:true, message:"La pregunta se ah realizado con exito, te avisaremos cuando el vendedor responda, mientras tanto seguí disfrutando de e-commics"}))
                    setQuestion("")
                    document.body.style.overflow = ""
                } //
                
            } catch (error) {
                console.log(error)
            } */
            return router.push(`/detail/${productData._id}`)

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
    useEffect(() => {
		if(userData) {
			dispatch(getCart(userData.id))
		}
	}, [dispatch, userData])
    
    // console.log(cartItems[0].products[0]._id)
    // console.log(userData)
    // console.log(productData._id)

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
        
        router.push(path)
    }
    
    useEffect(() => {
        userData && dispatch(getFavorites(userData.id))
    }, [userData, dispatch])

    const HandleToggleFavorite = () => {
        dispatch(getFavorites(userData.id))
        dispatch(handleFavorites(userData.id, productData._id))
        dispatch(getFavorites(userData.id))
 
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
                        
                        {
                        userData && userData?.id === productData?.user._id && edit ? 
                        <ImageView style={{display:"flex", flexDirection:"column"}}>
                        < ImageCarousel allImages={productUpDate.image} />
                        <div style={{margin:"auto"}}>
                        {productUpDate.image.map((a,index)=>{
                            return productUpDate.image.length > 1 && <button onClick={()=> removeImage(a)} >{`Remover la imagen: ${index}`}</button>
                        })}
                        </div>
                        
                        </ImageView>
                        : 
                        <ImageView>
                            < ImageCarousel allImages={productData.image} />
                        </ImageView>
                        }
                       
                    </ImageContainer>
                    <InfoContainer> 
                    {edit && userData && userData?.id === productData?.user._id &&  <EditActiveButton onClick={()=> handleEdit()}><AiFillEdit className="editIcon" /> Editar</EditActiveButton>
                    }
                    {!edit && userData && userData?.id === productData?.user._id &&  <EditInactiveButton onClick={()=> handleEdit()}><AiOutlineEdit className="editIcon" /> Editar</EditInactiveButton>}
                    {<DivLine></DivLine>}
                        {
                        userData && userData?.id === productData?.user._id && edit ? 
                        <FormProductContainer><span style={{padding: "0px", flexGrow: 1}}>Título</span><FormProductInput name="title" onChange={(e)=>handleProductUpDate(e)} value={productUpDate.title}/> </FormProductContainer>
                        : 
                        <Title>{productData.title}</Title>
                        }
                        {
                        userData && userData?.id === productData?.user._id && edit ? 
                        <FormProductContainer><span style={{padding: "0px", flexGrow: 1}}>Precio $</span><FormProductInput name="realprice" onChange={(e)=>handleProductUpDate(e)} min="1"  value={productUpDate.realprice}/> </FormProductContainer>
                        :

                        <InfoText>${productData.price}</InfoText>
                        }       
                        {
                        userData && userData?.id === productData?.user._id && edit ? 
                        <FormProductContainer><span style={{padding: "0px", flexGrow: 1}}>Descuento %</span><FormProductInput name="discount" onChange={(e)=>handleProductUpDate(e)} max="100" min="0" value={productUpDate.discount}/> </FormProductContainer>
                        :
                        <InfoText>{productData.discount ? "Con un " + productData.discount + "% de descuento!" : "" }</InfoText>
                        }                  
                        {
                        userData && userData?.id === productData?.user._id && edit ? 
                        <FormProductContainer><span style={{padding: "0px", flexGrow: 1}}>Cantidad</span><FormProductInput name="stock" onChange={(e)=>handleProductUpDate(e)} value={productUpDate.stock}/> </FormProductContainer>
                        : 
                            productData.stock === 0 ? <Advertise>No hay unidades disponibles por el momento</Advertise> :
                            productData.stock === 1 ? <Advertise>¡Queda una sola unidad!</Advertise> :
                            <Advertise>Quedan {productData.stock} unidades</Advertise>
                        }
                        <InfoTitle>Descripción</InfoTitle>
                        {
                        userData && userData?.id === productData?.user._id && edit ? 
                        <FormTextarea name="description" cols="40" rows="8" onChange={(e)=>handleProductUpDate(e)} value={productUpDate.description}/> 
                        : 
                        <Description>{productData.description}</Description>
                        }

                        <Description><strong>Vendido por: </strong> 
                            <UserStyledLink>
                                <StyledLink onClick={(e) => handleClick(e, "/search")} >
                                {productData.user.nickname}
                                </StyledLink>
                            </UserStyledLink>
                        </Description>

                        <Description><strong>Categoría: </strong> 
                        {
                             userData && userData?.id === productData?.user._id && edit ? 
                             categories && (
                    
                                <DetailSelectCategories onClick={handleProductUpDateCategory}>
                                    {categories.map(category => {
                                    return productUpDate.category.title === category.title?
                                    <DetailCategoryOption 
                                    key={category._id} 
                                    value={category._id} 
                                    selected
                                    defaultValue
                                    >
                                    {category.title}
                                    </DetailCategoryOption>
                                    :
                                    <DetailCategoryOption 
                                    key={category._id} 
                                    value={category._id} 
                                    >
                                    {category.title}
                                    </DetailCategoryOption>})}
                                </DetailSelectCategories>  
                           
                            )
                             : 
                        productData.category.title
                        
                        }</Description>
                         {
                        userData && userData?.id === productData?.user._id ? 
                            edit ?
                            <BuyButton onClick={()=>upDateProduct()} >Guardar</BuyButton>
                            :
                            <BuyButton style={{cursor: "unset"}} disabled>Es tu Producto!</BuyButton>
                        : 
                        productData?.stock === 0 ? <BuyButton disabled>Comprar ahora</BuyButton>
                        :
                        <BuyButton onClick={()=>buy()}>Comprar ahora</BuyButton>
                         }
                         {
                            productData?.stock === 0 ? <HurryAdvertise><em>Espera a que el vendedor reponga este artículo!</em></HurryAdvertise> : <HurryAdvertise><em>Apúrate! Este artículo se va volando</em></HurryAdvertise>
                        }
                       {/*  {
                        userData && userData.favorites ? 
                            (userData.favorites.find(f => f.productId === detail._id) ?
                            <AddingButton><a onClick={() => dispatch(handleFavorites(userData.id, productData._id))}><HeartIcon className="addFavIcon"/> Quitar de favoritos</a></AddingButton> 
                            :
                            <AddingButton><a onClick={() => dispatch(handleFavorites(userData.id, productData._id))}><HeartIcon className="addFavIcon"/> Agregar a favoritos</a></AddingButton>)
                        : <span></span>
                        }  */}
                        {
                            userData && userData?.favorites.length && userData.favorites.find(f => f._id === productData._id) ? <AddingButton><a onClick={HandleToggleFavorite}><HeartIconSolid className="addFavIcon"/> Quitar de favoritos</a></AddingButton> :
                            userData && userData?.favorites.length && userData.favorites.find(f => f._id === productData._id) === undefined ? <AddingButton><a onClick={HandleToggleFavorite}><HeartIconOutline className="addFavIcon"/> Agregar a favoritos</a></AddingButton> :
                            <span></span>
                        } 
                        {/* <AddingButton><HeartIcon className="addFavIcon"/> Agregar a favoritos</AddingButton> */}
                        {cartItems.find(p => p.products[0]._id === productData._id) ? 
                        <>
                       { cartItems.find(p => p.products[0]._id === productData._id).products[0].quantity}
                        </> : <></>}
                        {
                            productData?.stock === 0 ? null : <CartAddingButton onClick={() => handleCart()}><CartIconOutline className="addCartIcon"/> Agregar al carrito</CartAddingButton>
                        }
                        
                        {/* <div>
                            <button onClick={() => dispatch(decreaseItem(cartItems.find(p => p.products[0]._id === productData._id)._id, productData._id))}>-</button> Cantidad <button onClick={() => dispatch(increaseItem(cartItems.find(p => p.products[0]._id === productData._id)._id, productData._id, 1000))}>+</button>
						</div> */}


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
                    
                    <QuestionsContainer>
                        <Title>Preguntas</Title>
                        {
                        productData && productData?.questions?.length ? 
                            productData.questions.map(q => { 
                                return <div key={q._id}>
                                    <Question>
                                        {q.content}<br />
                                        <span style={{marginTop: "10px"}}> → {q.avatar} {q.userNickname} ({q.created_at.slice(0, 10)}) {q.answer ? <span>(respondido)</span> : <span>(pendiente de respuesta)</span>}</span>
                                    </Question>
                                    {
                                        q.answer ?
                                        <Answer>
                                            {q.answer}<br />
                                            <span style={{marginTop: "10px"}}> → {productData.user.nickname}</span>
                                        </Answer>
                                        :
                                        userData && userData?.id === productData?.user._id && 
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            axios.put(`/api/questions?id=${q._id}&answer=${e.target.answer.value}`)
                                            .then(r => {
                                                if(r.data.success_msg){
                                                    alert(r.data.success_msg)
                                                    return router.push(`/detail/${productData._id}`)
                                                }
                                                else{
                                                    return alert(r.data.error_msg)
                                                }})
                                            .catch(err => console.log(err))
                                        }}>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <StyledInput type="text" name="answer"></StyledInput>
                                                <GradientBorder>
                                                    <Input type="submit">Responder</Input>
                                                </GradientBorder>
                                            </div>
                                        </form>
                                    }
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
                                    {
                                        userData && userData?.id !== productData?.user._id ?
                                        <>
                                            <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                            {productData?.questions?.length ? <QuestionAdvertise>¿Quieres saber más?</QuestionAdvertise> : <></>}
                                                <QuestionAdvertise>Pregúntale al vendedor</QuestionAdvertise>
                                            </div>  
                                            <form
                                                style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}
                                                onSubmit={(e) => {handleSubmit(e); return router.push(`/detail/${productData._id}`)}}
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
                                        <QuestionAdvertise>¡Recuerda ser amable con todos los usuarios de Ecommics!</QuestionAdvertise>
                                    }
                                </>
                            :
                                <>
                                    <Space/>
                                    <Advertise style={{textAlign: "center"}}>Para realizar preguntas primero debes iniciar sesión. ¿Aún no tienes una cuenta de Ecommics? ¿Qué estás esperando?</Advertise>
                                </>
                        }
                    </QuestionsContainer>
                    <ReviewsContainer>
                        
                        <Title>Reseñas</Title>
                        <div >
                            {productData.reviews && productData.reviews.length ? 
                            productData.reviews.map(r => {
                                let star = "⭐"
                                return <ReviewConteiner key={r._id}>{r.content} <p>{star.repeat(r.rating)}</p></ReviewConteiner>
                                
                        })
                            :
                            <Advertise style={{textAlign: "center"}}>Aún no hay reseñas para este artículo</Advertise>
                            }
                        </div>
                    </ReviewsContainer>
                </QuestionsDiv>

            </DetailContainer>
        </Father>
    )
}




export default ProductDetail