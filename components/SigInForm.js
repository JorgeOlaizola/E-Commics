import e from "connect-flash";
import { useState } from "react";

const SigInForm = () => {
    
    const [input, setInput] = useState()
    
    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
    }
    const handleSubmit = () => {
        e.preventDefault();

    }
   
   
    return (
        <form onSubmit={e => handleSubmit(e)}>
            <label>Mail: </label>
            <input type="email" id='email' name="email" onChange={e => handleInputChange(e)} required></input>
            <label>Password: </label>
            <input type="password" id='password' name="password" onChange={e => handleInputChange(e)} required></input>
            <input type='submit'></input>
        </form>
    )
}

export default SigInForm;