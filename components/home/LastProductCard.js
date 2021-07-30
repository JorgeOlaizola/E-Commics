import styled from "styled-components";
import { useRouter } from "next/router";
import {StyledLink} from '../globalStyle'

const MainContainer = styled.div`
width:140px;
height:300px;

border:1px solid black;

`
const ImgContainer= styled.div`
width:100%;
height: 140px;
border-bottom: 1px solid black;
display:flex;
justify-content:center;
`

const ImageStyled = styled.img`
max-width: 100%;
max-height: 160px;
`
const PriceTitle = styled.h3`
font-size:1.4rem;
margin-bottom:25px;
margin-top:20px;

`
const InfoLinkContainer = styled.div`
width:80%;
margin:auto;
display:flex;
flex-direction: column;
`

const LastPostedProductCard = ({product})=>{
    const router = useRouter()
    console.log("en las product", product)
    return (
        <MainContainer>
            <ImgContainer>
                <ImageStyled src={product.image[0]}></ImageStyled>
            </ImgContainer>
            <InfoLinkContainer>
                <PriceTitle>$ {product.price}</PriceTitle>
                <StyledLink>
                    {product.title}
                </StyledLink>

            </InfoLinkContainer>

        </MainContainer>
    )

}

export default LastPostedProductCard;