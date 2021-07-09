import styled from "styled-components";
import { useSelector } from "react-redux";


//Component conteiner
const Conteiner = styled.div`
width: 25%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
border: 1px solid grey;
border-radius: 1rem;
margin: 1rem;
position: relative;
`

//Title "Filtros"
const FiltersTitle = styled.h3`
font-size: 2rem;
position: absolute;
top: 1rem;`

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
    
    const categories = useSelector(state => state.category.categories)
    return (
        <Conteiner> 
            <FiltersTitle>Filtros</FiltersTitle>
            <CategoriesFilterCont>
            <EachFilterTitle>Categorías</EachFilterTitle>
                {categories && categories.map(c => <button>{c.title}</button>)}
            </CategoriesFilterCont>
            <EachFilterTitle>Precio</EachFilterTitle>
            <input name="min" placeholder="min"></input>
            <input name="max" placeholder="max"></input>
            <button type="submit">Buscar</button>
        </Conteiner>
    )
}

export default Filters;