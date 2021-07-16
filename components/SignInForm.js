import e from "connect-flash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/actions/normalUsersActions";
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
        document.body.style.overflow = ""
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


