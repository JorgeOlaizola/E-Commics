import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { 
    resetPassword,
    signIn,
    signInWithGithub 
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
import {loginWithGitHub, onCloseSession} from '../firebase/client.js'

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
const GithHubButton = styled.button`
    width: 5rem
`


const SignInForm = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState()
    const [passwordShown, setPasswordShown] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false);

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    const  handleGithub = async () =>{
        loginWithGitHub()
            .then(user => {
                if(user.user.email){
                   return axios.post('/api/users/github', {githubID: user.user.uid})
                }
                else onCloseSession().then(r => console.log(r)).catch(err=> console.log(err))
                })
            .then(r=> {
                if(!r) return
                if(r.data.error_msg){
                    onCloseSession().then(r => console.log(r)).catch(err=> console.log(err))
                    return alert(r.data.error_msg);
                } 
                const cart = JSON.parse(localStorage.getItem('cartItems'))
                if(cart?.length) dispatch(signIn(r.data, cart)) 
                else dispatch(signIn(r.data, null)) 

                document.body.style.overflow = "";
                dispatch(showHideModal(false))
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = async (e) => {      
        e.preventDefault();
        const cart = JSON.parse(localStorage.getItem('cartItems'))
        if(cart?.length) {
            axios.post(`/api/users/logIn`, input)
            .then(r =>{
                if(r.data.error_msg) return alert(r.data.error_msg)

                dispatch(signIn(r.data, cart));
                document.body.style.overflow = "";
                dispatch(showHideModal(false))
            }

            )
            
            // dispatch(changeCart('60ecf7b0ef20060e68fbebf2', cart))            
        }
        else{
            axios.post(`/api/users/logIn`, input)
            .then(r =>{
                if(r.data.error_msg) return alert(r.data.error_msg)

                dispatch(signIn(r.data, null));
                document.body.style.overflow = "";
                dispatch(showHideModal(false))
            }

            )
        }
            

            /* dispatch(signIn(input, null)); */
            // dispatch(getCart('60ecf7b0ef20060e68fbebf2'))
        }

    const handleReset = (e) => {
        e.preventDefault();
        dispatch(resetPassword(input.email))   
    }
    
    return (
        <>
            {
                passwordReset === false ?
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
                        <span onClick={() => {setPasswordReset(true)}}>Olvidé mi contraseña</span>
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
                :
                    <LogInForm onSubmit={(e) => {handleReset(e)}}>
                        <h2>Recuperar contraseña</h2>
                        <FormInputs>
                            <FormLabel>Email</FormLabel>
                            <FormInput type="email" id='email' name="email" onChange={e => handleInputChange(e)} required></FormInput>
                        </FormInputs>
                        <span onClick={() => {setPasswordReset(false)}}>Atrás</span>
                        {!input ?
                                    <DisableBorder className="">
                                        <InputDisable type="submit" >Iniciar sesión</InputDisable>
                                    </DisableBorder>
                                    : 
                                    <GradientBorder className="">
                                        <Input type="submit">Enviar correo</Input>
                                    </GradientBorder>
                        }
                    </LogInForm>
            }
            <GithHubButton onClick={handleGithub}>iniciar con Git</GithHubButton>
            
        </>
    )
}

export default SignInForm;


