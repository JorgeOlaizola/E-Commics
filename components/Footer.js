import styled from "styled-components";


const FooterContainer = styled.div`
width: 100%;
background: radial-gradient(circle, #202020 0%, #151515  100%);
padding: 80px 60px;
`

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1024px;
    margin: 0 auto;
`

// export const Wrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     max-width: 1024px;
//     margin: 0 auto;
//     /* background: red; */
// `

const StyledText = styled.a`
    font-size: 0.8rem;
    color: #FFF;
    margin: 0 4px;
    margin-bottom: 20px;
    &:hover {
      color: #7ECAFF;
      transition: 0.1s ease-in;
  }
`

const StyledCopyright = styled.a`
    font-size: 0.7rem;
    color: #FFF;
    margin-bottom: 20px;
    text-decoration: none;
`

// const StyledBar = styled.a`
//     width: 1px;
//     height: 50px;
//     background-color: #FFF;
// `

export const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
  @media(max-width: 375px){
    margin-left: 30px;
  }
`;

export const FooterTitle = styled.p`
  font-size: 20px;
  color: #fff;
  margin-bottom: 20px;
  margin-top: 20px;
  font-weight: bold;
  font-family: ubuntu;
`;

export const FooterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  grid-gap: 20px;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

export const Icon = styled.i`
    font-size: 18px;
    margin-right: 16px;
`

const Footer = () => {
    return (
<FooterContainer>
            <StyledContainer>
                <FooterRow>
                    <FooterColumn>
                        <FooterTitle>
                            <img style={{width:"150px", marginLeft: "-10px"}} src={"https://ecommics.s3.sa-east-1.amazonaws.com/images/ecommics-logo-white.svg"}/>
                        </FooterTitle>
                           <StyledCopyright>Copyright © 2021 Ecommics</StyledCopyright> 
                    </FooterColumn>
                    <FooterColumn>
                    <FooterTitle>Acerca de</FooterTitle>
                        <StyledText href="#">ecommics</StyledText>
                        <StyledText href="#">Investors</StyledText>
                        <StyledText href="#">Política de privacidad</StyledText>
                        <StyledText href="#">Términos de uso</StyledText>
                    </FooterColumn>
                    <FooterColumn>
                    <FooterTitle>Contacto</FooterTitle>
                        <StyledText href="#">Whatsapp</StyledText>
                        <StyledText href="#">Email</StyledText>
                        <StyledText href="#">Ayuda</StyledText>
                    </FooterColumn>
                    <FooterColumn>
                    <FooterTitle>Redes sociales</FooterTitle>
                        <StyledText href="#">Instagram</StyledText>
                        <StyledText href="#">Facebook</StyledText>
                        <StyledText href="#">Twitter</StyledText>
                        <StyledText href="#">Youtube</StyledText>
                    </FooterColumn>
                </FooterRow>
            </StyledContainer>
</FooterContainer>
    )
}

export default Footer;

