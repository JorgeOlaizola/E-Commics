import styled from "styled-components";

const StyledContainer = styled.div`
    width: 100%;
    height: 100px;
    background-color: #151515;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

const StyledText = styled.a`
    font-size: 1rem;
    color: #FFF;
    margin: 0 4px;
`
const StyledCopyright = styled.a`
    font-size: 1rem;
    color: #FFF;
`

const StyledBar = styled.a`
    width: 1px;
    height: 50px;
    background-color: #FFF;
`

const Footer = () => {
    return (
        <StyledContainer>
            <img style={{width:"150px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg"}/>
            <StyledBar></StyledBar>
            <div>
                <StyledText>¿Quiénes somos?</StyledText>
                <StyledText>Contacto</StyledText>
                <StyledText>Política de privacidad</StyledText>
                <StyledText>Términos de uso</StyledText>
            </div>
            <StyledBar></StyledBar>
            <StyledCopyright>Copyright © 2021 Ecommics</StyledCopyright>
        </StyledContainer>
    )
}

export default Footer;