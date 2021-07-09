import Link from 'next/link';
import { useDispatch } from 'react-redux'
import { getProductDetail } from '../store/actions/productActions';
import styled from 'styled-components';

//Component conteiner
const Conteiner = styled.div`
border: 1px solid grey;
border-radius: 1rem;
margin-top: 1rem;
margin-bottom: 1rem;
display: flex;
flex-direction: column;
justify-content: center;
width: 90%;
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
`

//Styled link button
const StyledButton = styled.button`
padding: 0.5rem;
border-radius: 0.5rem;
font-size: 1rem;
width: 70%;
`


const Product = (props) => {
    const dispatch = useDispatch()
    return (
        <Conteiner>
            <ConteinerInfo>
                <img width="20%" height="100%" src={props.image}></img>
                <ConteinerDetail>
                    <h1>{props.title}</h1> <br/>
                    <p>{props.description}</p> <br/>
                    <span>Precio: {props.price} $ </span>
                    <span>Categoría: {props.category}</span>
                    <span>Publicado por {props.user}</span>
                    <StyledButton onClick={() => dispatch(getProductDetail(props.id))}>
                        <Link href={`/detail/${props.id}`} passHref> +Info </Link>
                    </StyledButton>
                </ConteinerDetail>
            </ConteinerInfo>

        </Conteiner>
    )
}

export default Product;
