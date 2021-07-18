import { useState } from "react";
import { useDispatch } from "react-redux";
import { 
    signIn, 
} from "../store/actions/normalUsersActions";
import {
    emptyCart, 
    getCart,
    changeCart
} from '../store/actions/cartActions'
import { showHideModal } from '../store/actions/stylesActions.js';
import {FormContainer, LogInForm, FormLabel, FormInputs, FormInput, FormSpan, Eye} from './user-panel/UserStyles.js';
import { Input, GradientBorder, DisableBorder, InputDisable } from './globalStyle'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styled from 'styled-components';

export const ProcessedFaEye = styled.div`
    position: relative;
    left: 248px;
    top: -19px;
    font-size: 90%;
    color: grey;
    &:hover {
    color: black;
    cursor: pointer;
  }
` 

const SignInForm = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState()
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {      
        e.preventDefault();

        dispatch(signIn(input));
        const cart = JSON.parse(localStorage.getItem('cartItems'))
        if(cart.length) {
            dispatch(emptyCart())
            dispatch(changeCart('60ecf7b0ef20060e68fbebf2', cart))            
        }
        else{
            dispatch(getCart('60ecf7b0ef20060e68fbebf2'))
        }
        document.body.style.overflow = "";
        dispatch(showHideModal(false))
    }

 
    return (
        <LogInForm onSubmit={handleSubmit}>
        <h2>Iniciar sesión</h2>
            <FormInputs>
                <FormLabel>Email</FormLabel>
                <FormInput type="email" id='email' name="email" onChange={e => handleInputChange(e)} required></FormInput>
            </FormInputs>
            <FormInputs>
                <FormLabel>Contraseña</FormLabel>
                <FormInput type={passwordShown ? "text" : "password"} id='password' name="password" onChange={e => handleInputChange(e)} required></FormInput>
                <ProcessedFaEye onClick={togglePasswordVisiblity}>{!passwordShown ? <FaEye/> : <FaEyeSlash/>}</ProcessedFaEye>
            </FormInputs>
            {!input ?
                        <DisableBorder className="">
                            <InputDisable type="submit" >Iniciar sesión</InputDisable>
                        </DisableBorder>
                        : 
                        <GradientBorder className="">
                            <Input type="submit">Iniciar sesión</Input>
                        </GradientBorder>
            }
        </LogInForm>
    )
}

export default SignInForm;


