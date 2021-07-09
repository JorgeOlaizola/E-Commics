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
justify-content: center;
align-items:center;
width: 25%;
max-height:620px;
`


//Align items
const ConteinerInfo = styled.div`
display: flex;
flex-direction: raw;
`
//Detail conteiner (Title, description, price, detail link, etc.) <-- it doesnt includes the img
const ConteinerDetail = styled.div`
display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: space-around;
margin-left: 50px;
margin-bottom: 5%;
`
//Image container
const ImageConteiner = styled.div`
width:100%;
align-self: top;

`

//Styled link button
const StyledButton = styled.button`
padding: 0.5rem;

font-size: 1rem;
width: 60%;
`


const Product = (props) => {
    const dispatch = useDispatch()
    return (
        <CardConteiner>
            <ImageConteiner>
                <img width="100%" src={props.image}></img>

            </ImageConteiner>
                <ConteinerDetail>
                    <h1>{props.title}</h1> 
                    <p>{props.description}</p> 
                    <span>Precio: {props.price} $ </span>
                    <span>Categoría: {props.category}</span>
                    <span>Publicado por {props.user}</span>
                    <StyledButton onClick={() => dispatch(getProductDetail(props.id))}>
                        <Link href={`/detail/${props.id}`} passHref> +Info </Link>
                    </StyledButton>
                </ConteinerDetail>
           

        </CardConteiner>
    )
}

export default Product;
