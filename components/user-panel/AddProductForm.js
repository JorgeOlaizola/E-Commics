import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSellingProduct } from '../../store/actions/productActions.js';
import styled from 'styled-components'

const AddProductForm = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user.userData);
    const categories = useSelector(state => state.category.categories)
    
    const [input, setInput] = useState({
        title: '',
        description: '',
        stock: '',
        price: '',
        image: '',
        category: '',
        user: user._id
    })

    function handleChange (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(addSellingProduct(input));
    }

    function handleSelect (e) {
        setInput({
            ...input,
            category: e.target.value
        })
    }
    return (
        <div>
            <form
                onSubmit={(e) => {handleSubmit(e)}}
            >
                <div>
                    <label>Nombre del producto</label>
                    <input
                        type='text'
                        name='title'
                        onChange={(e) => {handleChange(e)}}
                    />
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea
                        rows="5"
                        cols="25"
                        name="description"
                        onChange={(e) => {handleChange(e)}}
                    />
                </div>
                <div>
                    <label>Stock</label>
                    <input
                        type='number'
                        name='stock'
                        onChange={(e) => {handleChange(e)}}
                    />
                </div>
                <div>
                    <label>Precio</label>
                    <input
                        type='number'
                        name='price'
                        onChange={(e) => {handleChange(e)}}
                    />
                </div>
                {/* <div>
                    <label>User</label>
                    <input
                        type='text'
                        name='user'
                        onChange={(e) => {handleChange(e)}}
                    />
                </div> */}
                <div>
                    <label>Category</label>
                    <select onChange={handleSelect}>
                    <option>Category</option>
                    {categories && categories.map(c => <option value={c._id}>{c.title}</option>)}
                    </select>
                </div>
                <div>
                    <label>Image</label>
                    <input
                        type='text'
                        name='image'
                        onChange={(e) => {handleChange(e)}}
                    />
                </div>
                <button type='submit'>Agregar</button>
            </form>
        </div>
    )
}

export default AddProductForm;