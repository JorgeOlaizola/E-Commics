import e from "connect-flash";
import { useState } from "react";
import axios from "axios";

const SignInForm = () => {
    
    const [input, setInput] = useState()
    
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }

    //POST

    const handleSubmit = (e) => {
        e.preventDefault();
        s
        async function SignInPost(){
            const signIn = await axios.post(`${process.env.NEXT_PUBLIC_LOCALHOST}logIn`, input)
            console.log(signIn)
        }
        setInput({})
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