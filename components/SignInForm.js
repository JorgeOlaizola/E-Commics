import e from "connect-flash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/actions/normalUsersActions";
import {FormContainer, LogInForm, FormLabel, FormInputs, FormInput, FormSpan, Eye} from './user-panel/UserStyles.js';
import { Input, GradientBorder, DisableBorder, InputDisable } from './globalStyle'


const SignInForm = () => {

    const dispatch = useDispatch();
    const [input, setInput] = useState()
    
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        console.log(input)
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
                <FormInput type="password" id='password' name="password" onChange={e => handleInputChange(e)} required></FormInput>
            </FormInputs>
            {!input ?
                        <DisableBorder className="">
                            <InputDisable className="inputbutton" type="submit" />
                        </DisableBorder>
                        : 
                        <GradientBorder className="">
                            <Input className="inputbutton" type="submit"  />
                        </GradientBorder>
            }
        </LogInForm>
    )
}

export default SignInForm;


