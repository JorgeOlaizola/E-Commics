import CategoryCard from './CategoryCard'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { getFilteredProducts, searchByCategory } from '../../store/actions/productActions'
import Link from 'next/link'

const StyledContainer = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
justify-content: center;
`

const CardContainer = styled.img`
margin: 5px;
width: 215px;
height: 143.33px;
border-radius: 5px;
cursor: pointer;
&:hover {
    box-shadow: 0 0 20px rgba(33,33,33,.4);
}
`

const CategoryCards =()=>{
    const dispatch = useDispatch();
    const router = useRouter();

    const filters = useSelector(state => state.product.filters);

    function handleClick(e) {
        let obj = {
            user : "",
            category: e.target.id,
            score : {
                start: 0,
                end: 0
            },
            price : {
                start: 0,
                end: 0
            },
            search:{
                in: "title",
                text: ""
            },
            order:{
                in: "",
                or: 1
            },
            page: 1
        }
        dispatch(searchByCategory(e.target.id))
        dispatch(getFilteredProducts(obj))
    }

    return(
        <>
        <h2> Categorías </h2>
        <StyledContainer>
            <Link href="/search" passHref><CardContainer id="60f0afc73bce402a68c46885" onClick={(e)=>{handleClick(e)}} src="/categories/comic0.png"/></Link>
            <Link href="/search" passHref><CardContainer id="60ec582df1b40a2644b17afe" onClick={(e)=>{handleClick(e)}} src="/categories/series0.png"/></Link>
            <Link href="/search" passHref><CardContainer id="60f0afcd3bce402a68c46889" onClick={(e)=>{handleClick(e)}} src="/categories/movies0.png"/></Link>
            <Link href="/search" passHref><CardContainer id="60f0afc33bce402a68c46883" onClick={(e)=>{handleClick(e)}} src="/categories/anime0.png"/></Link>
            <Link href="/search" passHref><CardContainer id="60f0afca3bce402a68c46887" onClick={(e)=>{handleClick(e)}} src="/categories/manga0.png"/></Link>
            <Link href="/search" passHref><CardContainer id="60ec583af1b40a2644b17b02" onClick={(e)=>{handleClick(e)}} src="/categories/rol0.png"/></Link>
            <Link href="/search" passHref><CardContainer id="60ec5832f1b40a2644b17b00" onClick={(e)=>{handleClick(e)}} src="/categories/games0.png"/></Link>
            <Link href="/search" passHref><CardContainer id="" onClick={(e)=>{handleClick(e)}} src="/categories/todo0.png"/></Link>
        </StyledContainer>
        </>
    )
}

export default CategoryCards;