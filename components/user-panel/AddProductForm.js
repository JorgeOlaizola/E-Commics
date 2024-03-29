import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSellingProduct } from '../../store/actions/productActions.js';
import styled from 'styled-components'
import axios from 'axios';
import { useRouter } from 'next/router'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Input, GradientBorder, DisableBorder, InputDisable, EraseButton, BuyButton, OptionButton, StyledLink } from '../globalStyle';
 
//#region  estilos
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
  width: 400px;
  margin: auto;
  display: flex;
  align-items: left;
  flex-direction: column;
  padding: 1rem;
  @media (max-width: 420px){
    width: 100%;
    padding: 0rem;
    }
`;
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
const FormTextArea = styled.textarea`
width:100%;
height: 4rem;
border : none;
border-bottom: 1px solid #80808059;
font-size:1rem;
margin-top: 0.2rem;
font-family: roboto;
`
const ImageInput = styled.input`
display: none;
`
const ImageLabel = styled.label`
background: none;
color: ${(props) => props.theme.fontColor};
border: 1px solid ${(props) => props.theme.blueColorHover};
cursor: pointer;
font-size: 0.75rem;
font-family: ubuntu;
font-weight: 300;
padding: 6px;
margin: 20px 5px 0px 5px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.blueColorHover};
    }
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

const StyledImage = styled.img`
    width: 100%;
`

const Space = styled.div`
    height: 100px;
`
//#endregion

const AddProductForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData.user);
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
        user: user?.id
    })

    const [loading, setLoading] = useState("false");

    const router = useRouter()

    useEffect(()=>{
        setInput({
            ...input,
            user: user?.id
        })
    },[dispatch, user])

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
        setLoading("true");
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
                        
                        dispatch(addSellingProduct(respuesta))
                        setLoading('done')
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
            {loading === "done" ?
                <DivContainer>
                    <Space/>
                    <div>
                        <h2>Felicitaciones, tu producto ya se encuentra publicado!</h2>
                        <p>¿Deseas publicar otro producto? <StyledLink onClick={() => {setLoading("false"), setImageSelected([]), setInput({
                            title: '',
                            description: '',
                            stock: 0,
                            price: 0,
                            image: [],
                            category: '',
                            user: user?.id
                        })}}>click aqui</StyledLink></p>
                        <p>O puedes visitar el catálogo de productos <StyledLink onClick={() => {router.push('/search')}}>click aqui</StyledLink></p>
                    </div>
                </DivContainer> :
            user?.id && loading === "false" ?
                <DivContainer>
                    <h2>Publicar producto</h2>
                    <FormContainer onSubmit={(e) => { handleSubmit(e) }} >
                        <FormFieldset>

                            
                            <DivFormItem>
                                <label htmlFor="inputNombre">Nombre</label>
                                <br />
                                <FormInput
                                    onKeyDown={keyEnter}
                                    id="inputNombre"
                                    type='text'
                                    name='title'
                                    maxLength="50"
                                    value={input.title}
                                    onChange={(e) => { handleChange(e) }}
                                />
                            </DivFormItem>
                            <DivFormItem>
                                <label htmlFor="inputDescription">Descripción</label>
                                <br />
                                <FormTextArea
                                    onKeyDown={keyEnter}
                                    id="inputDescription"
                                    name="description"
                                    maxLength="400"
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
                                <label> Categorías</label>
                                <br /><br />
                                <details id="details">
                                    <summary>Opciones</summary>
                                    {categories && categories.map(c => <OptionButton  key={c._id} onClick={handleSelect} value={c.title} id={c._id}>{c.title}</OptionButton>)}
                                </details>
                                <br />
                                <label>{categorieSelect}</label>
                            </DivFormItem>
                            <DivFormItem>
                                {imageSelected.length > 0 && imageSelected.map((e, i) => <StyledImage key={mostrar(i)} src={mostrar(i)} />)}
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

                            <StyledLink href="/help/terms-and-conditions" >Términos y condiciones</StyledLink>
                        </DivFormItem>
                        {!input.title || !input.description || !input.stock || !input.price || !input.image || !input.category ?
                            <DisableBorder>
                                <InputDisable disabled>Publicar</InputDisable>
                            </DisableBorder>
                            : 
                            <GradientBorder>
                                <Input type="submit">Publicar</Input>
                            </GradientBorder>
                        }
                    </FormContainer>
                </DivContainer>
                :
                <DivContainer>
                    <Space/>
                    <PacmanLoader color={"#FFE100"} size={30}/>
                </DivContainer>
            }
        </>
    )
}

export default AddProductForm;





