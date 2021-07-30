import styled from "styled-components";
import { useRouter } from "next/router";
import {StyledLink} from '../globalStyle'
import Link from 'next/link'
import { FaLink } from "react-icons/fa";

const MainContainer = styled.div`
width:140px;
height:300px;

border:1px solid ${(props) => props.theme.colorLevel4};
&:hover {
    box-shadow: 0 0 20px rgba(33,33,33,.2);
    ${'' /* transform: scale(1.1); */}
    background: ${(props) => props.theme.backgroundLevel2}
}
@media (max-width: 320px) {
    margin: 0.6rem 0;
    }

`
const ImgContainer= styled.div`
width:100%;
height: 180px;
border-bottom: 1px solid ${(props) => props.theme.colorLevel4};
display:flex;
justify-content:center;
`

const ImageStyled = styled.img`
max-width: 100%;
max-height: 100%;
object-fit: contain;
`
const PriceTitle = styled.h3`
font-size:1.4rem;



`
const InfoLinkContainer = styled.div`
width:80%;

margin:auto;
display:flex;
flex-direction: column;
justify-content: space-around;
`



const LastPostedProductCard = ({product})=>{
    const router = useRouter()
   
    return (
        <MainContainer>
            <ImgContainer>
                <ImageStyled src={product.image[0]}></ImageStyled>
            </ImgContainer>
            <InfoLinkContainer>
                <PriceTitle>${product.price}</PriceTitle>
                   
              
                       
                

                <Link  href={'/detail/[productDetail]'} as={`/detail/${product._id}` } passHref>
                <StyledLink>
                            {product.title}
                    </StyledLink>
                   
                </Link>
               
            </InfoLinkContainer>

        </MainContainer>
    )

}

export default LastPostedProductCard;