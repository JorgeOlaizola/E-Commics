import Head from 'next/head';
import Container from '../../components/Container';
import styled from 'styled-components';
import { useRouter } from 'next/router';

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

const Reset = () => {

  const router = useRouter()
  const { token } = router.query

  function handleSubmit(e) {
    e.preventDefault();

    //ACA VA EL DISPATCH DE LA ACTION PARA CAMBIAR LA PASS, LLEVA EL TOKEN PARA EL BACK

    // ACA APARECE ALGÚN DISPLAY DE QUE TODO SALIÓ BIEN
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
      <DivContainer>
        <DivFormItem>Reestablece tu contraseña</DivFormItem>
        <FormContainer onSubmit={(e) => {handleSubmit(e) }} >
            <FormFieldset>
                <DivFormItem>
                    <label htmlFor="inputNombre">Ingresa tu nueva contraseña</label>
                    <br />
                    <FormInput
                    />
                </DivFormItem>
                <DivFormItem>
                    <label htmlFor="inputNombre">Repetir contraseña</label>
                    <br />
                    <FormInput
                    />
                </DivFormItem>
            </FormFieldset>
            <DivFormItem>
                <ButtonForm type='submit'>Aceptar</ButtonForm>
            </DivFormItem>
          </FormContainer>
        </DivContainer>
      </Container>
    </>
  )
}

export default Reset;