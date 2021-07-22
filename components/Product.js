import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { getProductDetail } from '../store/actions/productActions';
import styled from 'styled-components';
import { StyledLink } from './globalStyle';

//Component conteiner
const CardContainer = styled.div`
transition:  all 0.2s ease-out;
border: 1px solid ${(props) => props.theme.colorLevel4};
cursor: pointer;

margin: 1rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 280px;
height:400px;
${'' /* box-shadow: 0 0 11px rgba(33,33,33,.2); */}
&:hover {
    box-shadow: 0 0 20px rgba(33,33,33,.2);
    ${'' /* transform: scale(1.1); */}
    background: ${(props) => props.theme.backgroundLevel2}
}
@media (max-width: 320px) {
    margin: 0rem;
    }
`




//Image container
const ImageContainer = styled.div`
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
const ContainerDetail = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
flex-wrap: wrap;
padding: 0 10%;
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
const PriceTitle = styled.h3`
${'' /* font-size:1.5rem; */}
margin-bottom:5px;
`
//card product title
const CardProductTitle = styled.h4`
${'' /* font-size:1.2rem; */}
margin-top: 10px;
`

//Styled link button
const StyledButton = styled(StyledLink)`
margin-bottom: 5px;
color: #FF0000;
display: inline;
padding-right: 2px;
transition: 0.2s;

&:hover {
    color: #E10000;
    padding-right: 7px;
    transition: 0.2s;
}
`

const ArrowSpan = styled.span`
display: inline;
padding-left: 2px;
transition: 0.2s;
color: #FF0000;
&:hover {
    padding-left: 7px;
    transition: 0.2s;
}
`

//backdrop-filter: blur(5px)git pull

const Product = (props) => {
    const dispatch = useDispatch()
    const image= props.image[0];
    // console.log("aca viendo algo en product", props)
    return (
        <Link href={'/detail/[productDetail]'} as={`/detail/${props.id}` } passHref>
            <CardContainer>
                <ImageContainer imgUrl={image}>
                    <DivParaSafar>
                        {/* <img height="100%" src={props.image} ></img> */}
                        <ProductImage src={props.image[0]}></ProductImage>
                    </DivParaSafar>
                </ImageContainer>
                <ContainerDetail>
                    <div>
                        <PriceTitle>${props.price}</PriceTitle> 
                        <CardProductTitle> {props.title}  </CardProductTitle>
                    </div>
                    <div>
                        <StyledButton onClick={() => dispatch(getProductDetail(props.id))}>
                            ver detalle 
                        </StyledButton><ArrowSpan>→</ArrowSpan>
                    </div>
                </ContainerDetail>
            </CardContainer>
        </Link>   
    )
}

export default Product;
