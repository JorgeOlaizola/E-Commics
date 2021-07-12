import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GradientBorder, Input } from "../pages/globalStyle";
import { 
    searchByCategory, 
    searchByPriceMin,
    searchByPriceMax,
    getFilteredProducts } from '../store/actions/productActions'
import { useEffect } from "react";


//Component conteiner
const FilterConteiner = styled.aside`
grid-area: asideLeft;
display: flex;
align-items: center;
flex-direction: column;
border: 1px solid grey;

margin: 1rem;
position: relative;
`

//Title "Filtros"
const FiltersTitle = styled.h3`
margin-top: 1rem;
font-size: 2rem;
`

//Title of each filter division
const EachFilterTitle = styled.h6`
font-size: 1.3rem;
padding: 1rem;
`

//Category filters conteiner
const CategoriesFilterCont = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 1rem;
`



const Filters = () => {
    
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
        if(!parseInt(filters.price.start)){
            newFilters.price.start = 0
        }
        if(parseInt(filters.price.start) > parseInt(filters.price.end)){
            newFilters.price.end = 9999999999
        }
        dispatch(getFilteredProducts(newFilters))
    }
    return (
        <FilterConteiner> 
            <FiltersTitle>Filtros</FiltersTitle>
            <CategoriesFilterCont>
                {categories && (
                    <details>
                        <summary>Categorías</summary>
                        <button onClick={() => dispatch(searchByCategory(""))}>Default</button>    
                        {categories.map(c => <button onClick={CategoryFilter}value={c._id}>{c.title}</button>)}
                    </details>
                    )}
            </CategoriesFilterCont>
            <EachFilterTitle>Precio</EachFilterTitle>
                <input type="number" name="min" placeholder="min" onChange={handlePrice}></input>
                <input type="number" name="max" placeholder="max" onChange={handlePrice}></input>
                <GradientBorder>
                         <Input className="inputbutton" type="submit" onClick={handleSubmit}></Input>
                </GradientBorder>
           
        </FilterConteiner>
    )
}

export default Filters;

/**
 *  <input name="min" placeholder="min"></input>
            <input name="max" placeholder="max"></input>
            <button type="submit">Buscar</button>


            categories.map(c => <button id={c.title}>{c.title}</button>)
 */