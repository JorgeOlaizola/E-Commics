import styled from "styled-components";
import Link from 'next/link'

const CardContainer = styled.div`
width: 280px;
height: 180px;
background: url(${(props) => props.bkgImage})
display:flex;
justify-content:space-between;
padding-left: 5px;
&:hover {
    box-shadow: 0 0 20px rgba(33,33,33,.2);
}
`

const CategoryCard = ({bkgImage})=>{
    
    return (
        <CardContainer bkgImage={bkgImage}>
            hola
        </CardContainer>
    )
}

export default CategoryCard;