import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GradientBorder, Input } from "./globalStyle";
import { 
    searchByCategory, 
    searchByPriceMin,
    searchByPriceMax,
    resetFilters,
    getFilteredProducts } from '../store/actions/productActions'
import { useEffect } from "react";


//Component conteiner
const FilterContainer = styled.aside`
grid-area: asideLeft;
display: flex;
align-items: center;
flex-direction: column;
border-right: 1px solid ${(props) => props.theme.colorLevel4};
${'' /* box-shadow: 0 0 11px rgba(33,33,33,.2); */}
margin: 1rem 0;
padding: 0 16px;
position: relative;
@media (max-width: 900px){
    border-right: none;
    border-bottom: 1px solid ${(props) => props.theme.colorLevel4};
    margin: 0 0 1rem 0;
}
`

//Title "Filtros"
const FiltersTitle = styled.h2`
${'' /* margin-top: 1rem; */}
`

//Title of each filter division
const EachFilterTitle = styled.h3`
${'' /* font-size: 1.3rem; */}
${'' /* padding: 1rem; */}
@media (max-width: 900px) {
    display: none;
    }
`
const EachFilterTitleRes = styled.h4`
${'' /* font-size: 1.3rem; */}
${'' /* padding: 1rem; */}
display: none;
@media (max-width: 900px) {
   display: inline;
   padding-right: 10px;
}
`

const MinMaxDiv = styled.div`
display: flex;
gap: 10px;
margin-bottom: 1rem;
@media (max-width: 900px) {
    margin-bottom: 0;

}
`

//Category filters conteiner
const CategoriesFilterCont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 1rem;
@media (max-width: 900px) {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0.2rem;
    }
`

const ResponsiveFilters = styled.div`
@media (max-width: 900px) {
    dispay: flex;
    flex-direction: row;
    flex-wrap: wrap;
    }
`

//Category filters
const SelectCategories = styled.select`
display: block;
padding: 0 10px;
outline: none;
border-radius: 2px;
width: 100%;
@media (max-width: 900px) {
    position: relative;
    display: inline;
    ${'' /* width: 90%; */}
    }
`

const CategoryFiltersOption = styled.option`
display: block;
padding: 0 10px;
outline: none;
border-radius: 2px;
width: 100%;
@media (max-width: 900px) {
    display: inline;
    ${'' /* width: 90%; */}
}
`


const Filters = ({userId}) => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.category.categories)
    const filters = useSelector(state => state.product.filters)

    //Filters handlers

    const CategoryFilter = (event) => {
        event.preventDefault()
        const categoryId = event.target.value
        dispatch(searchByCategory(categoryId))
    }

    //Handlers

    const handlePrice = (e) => {
        if(e.target.value >= 0) e.target.name === 'min' ? dispatch(searchByPriceMin(e.target.value)) : dispatch(searchByPriceMax(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newFilters = {
            ...filters
        }
        //userId && {...newFilters, user: userId.user}
        if(userId) newFilters = {...newFilters, user: userId.user}
        

        if(!parseInt(filters.price.start)){
            newFilters.price.start = 0
        }
        if(parseInt(filters.price.start) > parseInt(filters.price.end)){
            newFilters.price.end = 9999999999
        }
        dispatch(getFilteredProducts(newFilters))
    }

    const handleAll = () => {
        dispatch(resetFilters())
        dispatch(getFilteredProducts(filters))
    }

    return (
        <FilterContainer> 
            <FiltersTitle>Filtros</FiltersTitle>
            <ResponsiveFilters>
                <CategoriesFilterCont>
                    <EachFilterTitle>Categorías</EachFilterTitle>
                    {categories && (
                        
                            <SelectCategories onClick={CategoryFilter}>
                                {categories.map(category => <CategoryFiltersOption key={category._id} value={category._id} >{category.title}</CategoryFiltersOption>)}
                            <option value="" selected defaultValue>Todas las categorías</option>  
                            {/* {categories.map(c => <button onClick={CategoryFilter}value={c._id}>{c.title}</button>)} */}
                            </SelectCategories>  
                       
                    )}
                </CategoriesFilterCont>
                <CategoriesFilterCont>
                <EachFilterTitle>Precio</EachFilterTitle>
                <EachFilterTitleRes>Precio</EachFilterTitleRes>
                    <MinMaxDiv>
                        <input style={{width: '75px', fontSize: "0.8rem"}} type="number" name="min" placeholder="min" onChange={handlePrice}></input>
                        <input style={{width: '75px', fontSize: "0.8rem"}} type="number" name="max" placeholder="max" onChange={handlePrice}></input>
                    </MinMaxDiv>
                </CategoriesFilterCont>
                <GradientBorder>
                    <Input type="submit" onClick={handleSubmit}>Filtrar</Input>
                </GradientBorder>
                <GradientBorder>
                    <Input onClick={handleAll}>Ver todos los productos</Input>
                </GradientBorder>
            </ResponsiveFilters>
        </FilterContainer>
    )
}

export default Filters;

/**
 *  <input name="min" placeholder="min"></input>
            <input name="max" placeholder="max"></input>
            <button type="submit">Buscar</button>


            categories.map(c => <button id={c.title}>{c.title}</button>)
 */