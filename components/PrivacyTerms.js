import styled from "styled-components";

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

const Privacy = () => {
    return(
        <StyledContainer>
            <h2>Política de privacidad de Ecommics</h2>
            <StyledTextBox>
                En Ecommics recolectamos información personales con el objetivo de garantizar la mejor experiencia tanto para vendedores como compradores. 
                <br/><br/>
                ¿Que información recolectamos? Toda aquella información requerida para el registro (nombre, apellido, sobrenombre, correo electrónico, imagen de perfil), bienes favoritos, estadísticas de venta, estadísticas de compra e interacciones con otros usuarios.
                <br/><br/>
                Recuerda que al utilizar Ecommics estás aceptando los términos y condiciones de Mercado Pago a la hora de realizar cualquier compra o venta, por lo que la información requerida para dichas transacciones correrá por cuenta de Mercado Pago, quedando Ecommics libre de cualquier tipo de responsabilidad al respecto.
                <br/><br/>
                Nadie de Ecommics nunca te pedirá información adicional a la requerida por el sitio o a la correspondiente a la verificación de una tienda oficial. Asimismo, como se detalla en los términos y condiciones, ningún Usuario podrá requerir información personal de otro Usuario.
            </StyledTextBox>
        </StyledContainer>
    )
}

export default Privacy;
