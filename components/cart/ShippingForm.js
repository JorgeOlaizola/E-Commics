import styled from "styled-components";
import { useState } from "react";
import {setShippingInfo} from '../../store/actions/cartActions'
import { useDispatch } from "react-redux";
import {BuyButton, Input, GradientBorder, DisableBorder, InputDisable } from '../globalStyle'

const FormStyled = styled.form`
width:50%;
margin:2rem;
display: flex;
flex-direction: column;
margin:auto;
@media (max-width: 500px){
    width: 100%;
    margin:0;
}

`
const FormContainer = styled.div`
width:100%;

margin-top: 1rem;
margin-bottom: 1rem;
display: flex;

` 

const MainContainer = styled.div`
width:100%;
border-top: 1px solid black;
border-bottom: 1px solid black;
margin-top: 1rem;
margin-bottom: 1rem;
`

const ShippingForm =()=> {
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        localidad:'',
        calle:'',
        numero:'',
        piso:'',
        depto:'',
        cp: '',
        info:''
    })
    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    

    function handleSubmit(e){
        e.preventDefault()
        dispatch(setShippingInfo(input))
        
        setInput({  
        localidad:'',
        calle:'',
        numero:'',
        piso:'',
        depto:'',
        cp: '',
        info:''
    })

    }

        
    return (
        <MainContainer>
                <h2 >Datos de envío</h2>
            <FormContainer>
                    <FormStyled onSubmit={(e)=>handleSubmit(e)}>
                        <label>localidad *</label>
                        <input
                        type="text"
                        name="localidad"
                        id="localidad"
                        value={input.localidad}
                        onChange={(e) => {handleChange(e)}}
                        required="required"
                        ></input>
                        <label>calle </label>
                        <input
                        type="text"
                        name="calle"
                        id="calle"
                        value={input.calle}
                        onChange={(e) => {handleChange(e)}}
                        required="required"
                        ></input>
                        <label>número *</label>
                        <input
                        type="text"
                        name="numero"
                        id="numero"
                        value={input.numero}
                        onChange={(e) => {handleChange(e)}}
                        required="required"
                        ></input>
                        <label>piso</label>
                        <input
                        type="text"
                        name="piso"
                        id="piso"
                        value={input.piso}
                        onChange={(e) => {handleChange(e)}}
                        ></input>
                        <label>depto</label>
                        <input
                        type="text"
                        name="depto"
                        id="depto"
                        value={input.depto}
                        onChange={(e) => {handleChange(e)}}
                        ></input>
                        <label>código postal *</label>
                        <input
                        type="text"
                        name="cp"
                        id="cp"
                        value={input.cp}
                        onChange={(e) => {handleChange(e)}}
                        required="required"
                        ></input>
                        <label>información adicional</label>
                         <input
                        type="text"
                        name="info"
                        id="info"
                        value={input.info}
                        onChange={(e) => {handleChange(e)}}
                        ></input>
                        <GradientBorder>
                            <Input type="submit">Continuar compra</Input>
                        </GradientBorder>
                </FormStyled>


            </FormContainer>

        </MainContainer>
        
        
    )
}

export default ShippingForm;