import styled from "styled-components";
import { StyledLink } from "../globalStyle";
import Link from 'next/link'

const CardContainer = styled.div`
width: 280px;
height: 180px;
border:1px solid ${(props) => props.theme.colorLevel4};
display:flex;
justify-content:space-between;
padding-left: 5px;
&:hover {
    box-shadow: 0 0 20px rgba(33,33,33,.2);
    ${'' /* transform: scale(1.1); */}
    background: ${(props) => props.theme.backgroundLevel2}
}
`
const ImageContainer = styled.div`
width:100px;
border-bottom: 1px solid ${(props) => props.theme.colorLevel4};
display:flex;
align-items:center;

`
const ProductImage = styled.img`
max-width: 100%;
max-height:170px;
`
const InfoContainer = styled.div`
width: 160px;
height: 120px;
display:flex;
flex-direction: column;
justify-content:space-around;
margin-left:5px;
margin-top:25px;

`
const PriceTitle = styled.h3`
font-size:1.4rem;
margin-bottom:25px;
margin-top:20px;

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

const FeaturedProductCard = ({product})=>{
    
    return (
        <CardContainer>
            <ImageContainer>
                <ProductImage src={product.image[0]}></ProductImage>
            </ImageContainer>
            <InfoContainer>
           
                    <p>
                            {product.title}
                    </p>
                
                <PriceTitle>$ {product.price}</PriceTitle>
              
                       
                <div >

                <Link  href={'/detail/[productDetail]'} as={`/detail/${product._id}` } passHref>
                                <StyledButton >ver detalle </StyledButton>
                            </Link><ArrowSpan>→</ArrowSpan>
                </div>
           
            </InfoContainer>

        </CardContainer>
    )
}

export default FeaturedProductCard;