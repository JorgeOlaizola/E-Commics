import e from "connect-flash";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../store/actions/normalUsersActions";

const SignInForm = () => {

    const dispatch = useDispatch();
    
    const [input, setInput] = useState()
    
    const handleInputChange = (e) => {
        
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        
    }

    const handleSubmit = async (e) => {      
        
        e.preventDefault();
        
        dispatch(signIn(input)); 

    }
 
    return (
        <form onSubmit={handleSubmit}>
            <label>Mail: </label>
            <input type="email" id='email' name="email" onChange={e => handleInputChange(e)} required></input>
            <label>Password: </label>
            <input type="password" id='password' name="password" onChange={e => handleInputChange(e)} required></input>
            <input type='submit'></input>
        </form>
    )
}

export default SignInForm;