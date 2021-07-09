import styled from "styled-components";
import { useSelector } from "react-redux";
import { GradientBorder, Input } from "../pages/globalStyle";


//Component conteiner
const FilterConteiner = styled.div`

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
    
    const categories = useSelector(state => state.category.categories)
    return (
        <FilterConteiner> 
            <FiltersTitle>Filtros</FiltersTitle>
            <CategoriesFilterCont>
            <EachFilterTitle>Categorías</EachFilterTitle>
                {categories && (<form >
                    <select>
                        {categories.map(c => <option value={c.title} id={c.title}>{c.title}</option>)}

                    </select>
                    <GradientBorder>
                         <Input className="inputbutton" type="submit"></Input>
                     </GradientBorder>
                </form>) }
            </CategoriesFilterCont>
            <EachFilterTitle>Precio</EachFilterTitle>
                <input name="min" placeholder="min"></input>
                <input name="max" placeholder="max"></input>
            <GradientBorder>
                <Input className="inputbutton" type="submit"></Input>
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