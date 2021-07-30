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
height: 140px;
border-bottom: 1px solid ${(props) => props.theme.colorLevel4};
display:flex;
justify-content:center;
`

const ImageStyled = styled.img`
max-width: 100%;
max-height: 140px;
`
const PriceTitle = styled.h3`
font-size:1.4rem;
margin-bottom:25px;
margin-top:20px;

`
const InfoLinkContainer = styled.div`
width:80%;
height:140px;
margin:auto;
display:flex;
flex-direction: column;
justify-content: space-around;
`
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

const LastPostedProductCard = ({product})=>{
    const router = useRouter()
   
    return (
        <MainContainer>
            <ImgContainer>
                <ImageStyled src={product.image[0]}></ImageStyled>
            </ImgContainer>
            <InfoLinkContainer>
                <PriceTitle>$ {product.price}</PriceTitle>
                    <span>
                            {product.title}
                    </span>
                
              
                       
                <div style={{marginTop:'5px'}}>

                <Link  href={'/detail/[productDetail]'} as={`/detail/${product._id}` } passHref>
                                <StyledButton >ver detalle </StyledButton>
                            </Link><ArrowSpan>→</ArrowSpan>
                </div>
            </InfoLinkContainer>

        </MainContainer>
    )

}

export default LastPostedProductCard;