import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { getProductDetail } from '../store/actions/productActions';
import styled from 'styled-components';

//Component conteiner
const CardConteiner = styled.div`
transition:  all 0.5s ease-out;

margin: 1rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 280px;
height:400px;
box-shadow: 0 0 11px rgba(33,33,33,.2);
&:hover {
    border: none;
    box-shadow: 0 0 20px rgba(33,33,33,.2);
    transform: scale(1.1);
}
`




//Image container
const ImageConteiner = styled.div`
background-image: url(${(props)=>props.imgUrl});
background-position:center;
backdrop-filter: brightness(1.5);
background-size:cover;


border-bottom: 1px solid grey;
width:100%;
height:60%;
display:flex;
justify-content:center;

`
//ATENCION LO PONGO EN ESPAÑOL DIV MOMENTANEO HASTA QUE SAQUE COMO DAR BLUR SOLO A LA IMAGEN DE FONDO
const DivParaSafar = styled.div`
border: 4px solid white;

`
//Detail conteiner (Title, description, price, detail link, etc.) <-- it doesnt includes the img
const ConteinerDetail = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
flex-wrap: wrap;
padding-left:10%;
margin-bottom: 5%;
width:100%;
height:40%;
`
//Etiqueta img
const ProductImage =  styled.img`
height:100%;
max-width:100%;

`

//price title
const PriceTitle = styled.h1`
font-size:1.5rem;
margin-bottom:5px;
`
//card product title
const CardProductTitle = styled.h2`
font-size:1.2rem;
margin-top: 10px;
`

//Styled link button
const StyledButton = styled.div`
margin-bottom: 5px;
color: red;
font-size: 1rem;
`

//backdrop-filter: blur(5px)git pull

const Product = (props) => {
    const dispatch = useDispatch()
    const image= props.image[0];
    // console.log("aca viendo algo en product", props)
    return (
        <CardConteiner>
            <ImageConteiner imgUrl={image}>
                <DivParaSafar>
                 {/* <img height="100%" src={props.image} ></img> */}
                    <ProductImage src={props.image[0]}></ProductImage>
                </DivParaSafar>

            </ImageConteiner>
                <ConteinerDetail>
                    <div>
                        <PriceTitle>${props.price}</PriceTitle> 
                        <CardProductTitle> {props.title}  </CardProductTitle>
                    </div>

                    <StyledButton onClick={() => dispatch(getProductDetail(props.id))}>
                        <Link href={`/detail/${props.id}`} passHref replace> ver detalle </Link>
                    </StyledButton>
                     
                    
                </ConteinerDetail>
           

        </CardConteiner>
    )
}

export default Product;
