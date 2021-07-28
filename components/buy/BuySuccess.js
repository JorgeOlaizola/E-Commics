import Link from 'next/link';
import styled  from 'styled-components';

const StyledContainer = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
`

const StyledTextBox = styled.div`
width: 66%;
margin-top: 50px;
display: flex;
flex-direction: column;
align-items: center;
`

const GreenBox = styled.div`
width: 100%;
height:  100px;
display: flex;
align-items: center;
justify-content: center;
background-color: #4BB543;
text-align: center;
border-top: 1px solid #000;
border-left: 1px solid #000;
border-right: 1px solid #000;
`

const WhiteBox = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
text-align: center;
padding: 20px;
border-left: 1px solid #000;
border-right: 1px solid #000;
border-bottom: 1px solid #000;
`

const Advertise = styled.div`
width: 100%;
display: flex;
justify-content: center;
text-align: center;
margin-top: 20px;
`

const Links = styled.p`
font-size: 14px;
margin: 0 10px;
&:hover{
    text-decoration: underline;
}
`

const BuySuccess = () => {
    return (
        <StyledContainer>
            <StyledTextBox>
                <GreenBox>
                    <h2>¡Felicitaciones! Tu compra ya esta casi lista</h2>
                </GreenBox>
                <WhiteBox>
                    <p>
                        Tu compra fue procesada con éxito, en breve recibirás un correo electrónico con el detalle de la misma.
                        <br/><br/>
                        Una vez que tus productos sean despachados por el vendedor recibirás un nuevo correo electrónico informándote sobre el envío. Recuerda siempre verificar la dirección de envío e informar a ecommics ante cualquier cambio en tus datos.
                        <br/><br/>
                        En caso de que haya habido algún error por favor <Link href='/help/contact'><a style={{color:"blue",cursor:"pointer"}}>contáctanos</a></Link>
                        <Advertise>
                            <Links><Link href='/'><a style={{cursor:"pointer"}}>Volver al inicio</a></Link></Links>
                            <Links><Link href='/search'><a style={{cursor:"pointer"}}>Seguir comprando</a></Link></Links>
                        </Advertise>
                    </p>
                </WhiteBox>
            </StyledTextBox>
        </StyledContainer>
    )
}

export default BuySuccess;
