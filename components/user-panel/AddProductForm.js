import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSellingProduct } from '../../store/actions/productActions.js';
import styled from 'styled-components'
import axios from 'axios';
import { useRouter } from 'next/router'
const DivContainer = styled.div`
margin:auto;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
padding:1rem;

font-weight: bold;
& label , a ,summary{
    
font-weight: normal;
}
`
const DivFormItem = styled.div`
margin:0.2rem;
padding: 0.5rem;
`
const FormContainer = styled.form`
max-width: 500px;
margin:auto;
display: flex;
justify-content: space-around;
align-items: left;
flex-direction: column;
padding:1rem;
`
const FormFieldset = styled.fieldset`
border: 2px solid #80808021;
padding:1rem;
`
const FormInput = styled.input`
width:100%;
border : none;
border-bottom: 1px solid #80808059;
font-size:1rem;
margin-top: 0.2rem;
`
const ImageInput = styled.input`
display: none;
`
const ImageLabel = styled.label`
    cursor: pointer;
`
const ButtonForm = styled.button`
padding: 0.5rem 1rem;
background-color: transparent;
border: 1px solid #808080;
cursor:pointer;
font-weight: bold;
transition: all 0.5s;

&:hover{
    font-size:0.8rem;
}
`
const AddProductForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData);
    const categories = useSelector(state => state.category.categories)
    const [categorieSelect, setCategorieSelect] = useState("")
    const [imageSelected, setImageSelected] = useState([]);
    const [input, setInput] = useState({
        title: '',
        description: '',
        stock: 0,
        price: 0,
        image: [],
        category: '',
        user: user._id
    })
    const router = useRouter()

    useEffect(() => {
        if (!user._id) {
            router.push("/")
        }
    }, [])
    function handleChange(e) {
        if (e.target.value < 0) {
            setInput({ ...input })
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }
    const keyEnter = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("mande")
        const terminos = document.getElementById("terminos")
        if (terminos.checked) {
            if (imageSelected) {
                Promise.all(

                    imageSelected.map((imageFile) => {
                        const fromData = new FormData()
                        fromData.append("file", imageFile)
                        fromData.append("upload_preset", "dbuwaryz")
                        return axios.post("https://api.cloudinary.com/v1_1/mecompany/image/upload", fromData)
                    })
                )
                    .then((resp) => {
                        let data = resp.map((r) => r.data.secure_url)

                        let respuesta = {
                            ...input,
                            image: data.join("&&")
                        }

                        dispatch(addSellingProduct(respuesta));
                        setTimeout(() => {
                            router.push("/search")
                        }, 2000)
                    })


            }
        }
        else {
            alert("Debes aceptar los terminos y condiciones")
        }


    }
    function handleSelect(e) {
        e.preventDefault();
        setCategorieSelect(e.target.value)
        setInput({
            ...input,
            category: e.target.id
        })
        const details = document.getElementById("details")
        details.removeAttribute("open");
    }
    const GuardarImage = (e) => {
        
        let image = [...e.target.files]
        if(image.length > 5){
            //avisamos el maximo de imagenes
            alert("El maximo de imagenes es de 5")
        }
        image = image.slice(0,5)
        setImageSelected(image)
    }
    const mostrar = (i) => {

        const objectURL = URL.createObjectURL(imageSelected[i])
        return objectURL

    }
    return (
        <>
            {user._id ?
                <DivContainer>
                    <DivFormItem>¿Qué vas a publicar?</DivFormItem>
                    <FormContainer onSubmit={(e) => { handleSubmit(e) }} >
                        <FormFieldset>

                            Producto
                            <DivFormItem>
                                <label htmlFor="inputNombre">Nombre</label>
                                <br />
                                <FormInput
                                    onKeyDown={keyEnter}
                                    id="inputNombre"
                                    type='text'
                                    name='title'
                                    value={input.title}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </DivFormItem>
                            <DivFormItem>
                                <label htmlFor="inputDescription">Descripción</label>
                                <br />
                                <FormInput
                                    onKeyDown={keyEnter}
                                    id="inputDescription"
                                    name="description"
                                    value={input.description}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </DivFormItem>
                            <DivFormItem>
                                <label htmlFor="inputStock">Stock</label>
                                <br />
                                <FormInput
                                    onKeyDown={keyEnter}
                                    id="inputStock"
                                    type='number'
                                    name='stock'
                                    value={input.stock}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </DivFormItem>
                            <DivFormItem>
                                <label htmlFor="inputPrice">Precio</label>
                                <br />
                                <FormInput
                                    onKeyDown={keyEnter}
                                    id="inputPrice"
                                    type='number'
                                    name='price'
                                    value={input.price}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </DivFormItem>
                            <DivFormItem>
                                <label> Categorias</label>
                                <br /><br />
                                <details id="details">
                                    <summary>Opciones</summary>
                                    {categories && categories.map(c => <button onClick={handleSelect} value={c.title} id={c._id}>{c.title}</button>)}
                                </details>
                                <br />
                                <label>{categorieSelect}</label>
                            </DivFormItem>
                            <DivFormItem>
                                {imageSelected.length > 0 && imageSelected.map((e, i) => <img width="100%" src={mostrar(i)} />)}
                            </DivFormItem>
                            <DivFormItem>
                                <ImageLabel htmlFor="file-upload">Cargar imagen</ImageLabel>
                                <ImageInput
                                    onKeyDown={keyEnter}
                                    multiple
                                    maxLength="2"
                                    max="2"
                                    type='file'
                                    id="file-upload"
                                    accept="image/png,image/jpeg,image/png"
                                    onChange={GuardarImage}
                                />
                            </DivFormItem>
                        </FormFieldset>
                        <DivFormItem>
                            <input
                                onKeyDown={keyEnter}
                                id="terminos"
                                type="checkbox"
                            />
                            <label htmlFor="terminos">Acepto los </label>

                            <a href="https://www.soyhenry.com/terms" style={{ color: "blue" }}>Terminos y condiciones</a>
                        </DivFormItem>
                        <DivFormItem>
                            <ButtonForm type='submit'>Publicar</ButtonForm>
                        </DivFormItem>
                    </FormContainer>
                </DivContainer>
                :
                <DivContainer>
                    <DivFormItem>No deberías poder acceder aqui sin estar logueado</DivFormItem>
                </DivContainer>
            }
        </>
    )
}

export default AddProductForm;