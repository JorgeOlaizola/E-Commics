import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCategories,
    deleteCategory,
    updateCategory,
    addCategory
} from '../../store/actions/categoriesActions'
import styled from "styled-components";
import {
    Input,
    GradientBorder,
    DisableBorder,
    InputDisable,
    EraseButton,
  } from "../globalStyle";

const NewsList = styled.div`
display: block;
max-width: 480px;
${'' /* flex-wrap: wrap; */}
margin: 8px 16px;
`

const UsersButton = styled(EraseButton)`
margin: 8px 16px 16px 0px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.blueColorHover};
    }
`

const UsersButtonDelete = styled(EraseButton)`
margin: 8px 16px 16px 0px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.redColorHover};
    }
`

const Categories = () => {
    const categories = useSelector(state => state.category.categories)
    useEffect(
        () => {
            dispatch(getCategories())
        }, [categories])

    const [input, setInput] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addCategory(input))
        getCategories()
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    const dispatch = useDispatch()
    return (
        <>
        <h2>Categorías</h2>
        <NewsList>
        
            <NewsList>
                
                <form onSubmit={handleSubmit}>
                    <label  style={{fontFamily: "ubuntu", color: "#00A0FF"}}>Agregar una nueva categoría: </label>
                    <input name="title" placeholder="" onChange={handleChange} value={input}></input>
                    <br /><GradientBorder><Input type="submit" value="Agregar">Agregar</Input></GradientBorder>
                </form>
            </NewsList>
            {categories.length > 0 ? categories.map(c =>{ 
                return  <NewsList key={c._id}>
                <p><strong>Título:</strong> {c.title}</p>
                <p><strong>Id:</strong> {c._id} </p>
                <div>
                    <UsersButtonDelete onClick={() => {
                        dispatch(deleteCategory(c._id))
                        getCategories()}}>Eliminar</UsersButtonDelete>  
                    <UsersButton onClick={() => {
                        dispatch(updateCategory(c._id))
                        getCategories()}}>Actualizar</UsersButton>
                </div>
                </NewsList>}) 
                : <span>No hay categorias</span>} 
        </NewsList>
        </>
    )
}

export default Categories;