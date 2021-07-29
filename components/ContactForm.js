import { useState } from "react";
import styled from "styled-components";
import emailjs from 'emailjs-com';

const StyledContainer = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
align-items: center;
`

const StyledTextBox = styled.div`
width: 50%;
text-align: justify;
`

const StyledForm = styled.form`
display: flex;
flex-direction: column;
`

const Contact = () => {

    const [input, setInput] = useState({
        name: "",
        surname: "",
        email: "",
        message: "",
        sent: ""
    })

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleNewMsg() {
        setInput({
            ...input,
            sent: ""
        })
    }

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_7y7i4v5', 'template_dzctp89', e.target, 'user_pKZb8nvHsAsy87QQgaCgH')
          .then((response) => {
              console.log(response.text);
          })
          .catch((error) => {
              console.log(error.text)
          })

        setInput({
            name: "",
            surname: "",
            email: "",
            message: "",
            sent: "true"
        })

        // setInput({...input, sent: "true"})
    }

    return(
        <>
        {
            input.sent === "true" ?
            <StyledContainer>
                <StyledTextBox>
                    <h2>Hemos recibido tu mensaje, alguien de nuestro equipo de contestará a la brevedad!</h2>
                    <p style={{cursor:"pointer"}} onClick={handleNewMsg}>Enviar otro mensaje</p>
                </StyledTextBox>
            </StyledContainer>
            :
            <StyledContainer>
                <h2>Contáctanos!</h2>
                <StyledTextBox>
                    <StyledForm onSubmit={(e) => sendEmail(e)}>
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={input.name}
                        onChange={(e) => {handleChange(e)}}
                    />
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="surname"
                        id="surname"
                        value={input.surname}
                        onChange={(e) => {handleChange(e)}}
                    />
                    <label>Correo electrónico</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        value={input.email}
                        onChange={(e) => {handleChange(e)}}
                    />
                    <label>Mensaje</label>
                    <input
                        type="text"
                        name="message"
                        id="message"
                        value={input.message}
                        onChange={(e) => {handleChange(e)}}
                    />
                    <button type="submit">Enviar</button>
                    </StyledForm>
                </StyledTextBox>
            </StyledContainer>
        }
        </>
    )
}

export default Contact;
