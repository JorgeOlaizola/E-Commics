import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setNewPassword } from '../store/actions/normalUsersActions';
import { GradientBorder, Input } from './globalStyle';

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
max-width: 500px;
margin:auto;
display: flex;
justify-content: space-around;
align-items: left;
flex-direction: column;
padding:1rem;
`
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

const StyledLabel = styled.label`
margin: 10px 0;
`

const PasswordReset = () => {

  const dispatch = useDispatch()

  const [input, setInput] = useState({
    pass1: "",
    pass2: ""
  })

  const [error, setError] = useState("")

  const router = useRouter()
  const { token } = router.query

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    console.log(input)
    if(input.pass1 !== input.pass2) {
      setError("Las contraseñas no coinciden")
    } else {
      setError("")
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setNewPassword(token, input));
  }

  return (
    <>
      <DivContainer>
        <h2>Reestablece tu contraseña</h2>
        <FormContainer onSubmit={(e) => {handleSubmit(e) }} >
            <FormFieldset>
                <DivFormItem>
                    <StyledLabel htmlFor="inputNombre">Ingresa tu nueva contraseña</StyledLabel>
                    <br />
                    <FormInput onChange={(e) => {handleChange(e)}} value={input.pass1} type="password" name="pass1"
                    />
                </DivFormItem>
                <DivFormItem>
                    <StyledLabel htmlFor="inputNombre">Repetir contraseña</StyledLabel>
                    <br />                   
                    <FormInput onChange={(e) => {handleChange(e)}} value={input.pass2} type="password" name="pass2"
                    />
                </DivFormItem>
            </FormFieldset>
            { input.pass1 !== input.pass2 ? <span style={{textAlign:"center",marginTop:"10px"}}>{error}</span> : null}
            <GradientBorder>
              {
                  error.length ?
                  <Input type='submit' disabled>Aceptar</Input>
                  :
                  <Input type='submit'>Aceptar</Input>
              }
            </GradientBorder>
          </FormContainer>
        </DivContainer>
    </>
  )
}

export default PasswordReset;