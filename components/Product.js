import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { getProductDetail } from '../store/actions/productActions';
import styled from 'styled-components';

//Component conteiner
const CardConteiner = styled.div`
border: 1px solid grey;
margin: 1rem;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 280px;
height:400px;
`




//Image container
const ImageConteiner = styled.div`
border: 1px solid grey;
width:100%;
height:60%;
display:flex;
justify-content:center;
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



const Product = (props) => {
    const dispatch = useDispatch()
    return (
        <CardConteiner>
            <ImageConteiner>
                <img height="100%" src={props.image}></img>

            </ImageConteiner>
                <ConteinerDetail>
                    <div>
                        <PriceTitle>${props.price}</PriceTitle> 
                        <CardProductTitle> {props.title}  </CardProductTitle>
                    </div>

                    <StyledButton onClick={() => dispatch(getProductDetail(props.id))}>
                        <Link href={`/detail/${props.id}`} passHref> ver detalle </Link>
                    </StyledButton>
                     
                    
                </ConteinerDetail>
           

        </CardConteiner>
    )
}

export default Product;
