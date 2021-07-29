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

const RedBox = styled.div`
width: 100%;
height:  100px;
display: flex;
align-items: center;
justify-content: center;
background-color: #ff3232;
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

const BuyFailure = () => {
    return (
        <StyledContainer>
            <StyledTextBox>
                <RedBox>
                    <h2>¡Ups, algo salió mal!</h2>
                </RedBox>
                <WhiteBox>
                    <p>
                        No pudimos procesar tu pago, esto puede deberse a un error en el sistema, tu conexión de internet, o los datos de pago provistos.
                        <br/><br/>
                        Tu carrito aún se encuentra vigente para que puedas intentar realizar tu compra nuevamente. Por favor verificación de los medios de pago que vayas a utilizar antes de reintentar realizar tu compra.
                        <br/><br/>
                        En caso de que haya habido algún error por favor <Link href='/help/contact'><a style={{color:"blue",cursor:"pointer"}}>contáctanos</a></Link>
                        <Advertise>
                            <Links><Link href='/'><a style={{cursor:"pointer"}}>Volver al inicio</a></Link></Links>
                            <Links><Link href='/cart'><a style={{cursor:"pointer"}}>Ir al carrito</a></Link></Links>
                        </Advertise>
                    </p>
                </WhiteBox>
            </StyledTextBox>
        </StyledContainer>
    )
}

export default BuyFailure;