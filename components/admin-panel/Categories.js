import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCategories,
    deleteCategory,
    updateCategory,
    addCategory
} from '../../store/actions/categoriesActions'

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
    <div>
        <h1>Categorias</h1>
        <form onSubmit={handleSubmit}>
            <input name="title" placeholder="Agregar una nueva categoría" onChange={handleChange} value={input}></input>
            <input type="submit" value="Agregar"></input>
        </form>
        {categories.length > 0 ? categories.map(c =>{ 
            return  <p key={c._id}>Título: {c.title} --- Id: {c._id} 
            <button onClick={() => {
                dispatch(deleteCategory(c._id))
                getCategories()}}>Delete</button> - 
            <button onClick={() => {
                dispatch(updateCategory(c._id))
                getCategories()}}>Update</button></p>}) 
            : <span>No hay categorias</span>} 
    </div>
    )
}

export default Categories;