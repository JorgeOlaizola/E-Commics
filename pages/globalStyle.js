import { createGlobalStyle } from 'styled-components'
import styled from "styled-components";


export const lightTheme = {
  body: '#fff',
  fontColor: '#000',
	backgroundButton: '#fff',
	borderButton: 'linear-gradient(to right, grey, #E4E4E4)',
  backgroundInput: '#fff',
  backgroundNav: '#fff',
  backgroundFindDiv: "#E6E6"
}

export const darkTheme = {
  body: '#000',
  fontColor: '#fff',
	backgroundButton: '#000',
	borderButton: 'linear-gradient(to right, grey, black)',
  backgroundInput: '#202020', // gris oscuro
  backgroundNav: '#101010', // gris oscuro++
  backgroundFindDiv: '#101010'
}

export const Navbar = styled.nav`
    min-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    padding: 0 2rem;
    border-bottom: 1px solid;
    background: ${(props) => props.theme.backgroundNav};
    @media (max-width: 480px) {
      padding: 0 1rem;
    }
`

export const StyledLink = styled.a`
    ${'' /* padding: 0rem 1rem; */}
    text-decoration: none;
    font-size: 0.875rem;
    font-family: ubuntu;
    &:hover{
      color: #0096FF;
    }
`

export const StyledLogoResponsive = styled.a`
  
    @media (min-width: 768px) {
      display: none;
    }
    @media (max-width: 480px) {
      width: 10px;
    }
`

export const StyledLogo = styled.a`
    @media (max-width: 768px) {
      display: none;
    }
`

export const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

export const LigthDarkThemeDiv = styled.div`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.fontColor};
`;

export const FindDiv = styled.div`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.fontColor};
  ${'' /* @media (max-width: 480px) {
    border: none;
  } */}
`;


export const InputText = styled.input`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.backgroundInput};
  width: 300px;
  height: 25px;
  border: none;
  @media (max-width: 768px) {
    max-width: 200px;
    }
  @media (max-width: 768px) {
  max-width: 200px;
  }
  @media (max-width: 480px) {
  max-width: 300px;
  ${'' /* display: none; */}
  }
  @media (max-width: 390px) {
  max-width: 260px;
  }
  @media (max-width: 320px) {
  max-width: 240px;
  }
`

// botton submit usuario
export const Input = styled.input`
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundButton};
  width: 100%;
  padding: 5px 10px;
  border: none;
  cursor:pointer;
  &:active {
	background-color: transparent;
	color: white;
	${'' /* transition: 0.5s; */}
  }
`

export const InputDisable = styled.input`
  color: grey;
  background-color: ${(props) => props.theme.backgroundButton};
  width: 100%;
  padding: 5px 10px;
  border: none;
  cursor: not-allowed;
`

export const GradientBorder = styled.div`
  margin: 20px;
  background: linear-gradient(45deg, rgba(255,0,0,1) 0%, rgba(0,192,255,1) 100%);
  padding: 2px;
  cursor:pointer;
  &:hover {
	background: linear-gradient(45deg, rgba(0,150,255,1) 35%, rgba(255,0,0,1) 100%);
	transition: 0.9s;
  }
`

export const DisableBorder = styled.div`
  margin: 20px;
  background: ${(props) => props.theme.borderButton};
  padding: 2px;
  cursor: not-allowed;
`

export const GlobalStyles = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	${'' /* font: inherit; */}
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style-type: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

body {
        background-color: ${(props) => props.theme.body};
		background: url("https://ecommics.s3.sa-east-1.amazonaws.com/images/bodyBackground.jpg") no-repeat center top;
		background-attachment: fixed;
}
a {
  color: inherit;
  text-decoration: none;
}
* {
  box-sizing: border-box;
}
h1 {
	font-family: Ubuntu;
	font-size: 2rem;
	margin: 1rem 0;
}
h2 {
	font-family: Ubuntu;
	font-weight: 500;
	font-size: 1.5rem;
	margin: 1rem 0;
}

${'' /* button {
	margin: 2rem;
} */}


${'' /* switch */}
.react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  
.react-switch-label {
display: flex;
/* align-items: center; */
/* justify-content: space-between; */
cursor: pointer;
width: 50px;
height: 20px;
background: grey; 
border-radius: 2px;
${'' /* border: 1px solid white; */}
position: relative;
transition: background-color .2s;
margin: 0px 4px;
${'' /* background: black; */}
}
  
.react-switch-label .react-switch-button {
content: '';
position: absolute;
top: 2px;
left: 2px;
width: 20px;
height: 15px;
border-radius: 2px;
transition: 0.2s;
background: white;
box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
}
  
.react-switch-checkbox:checked + .react-switch-label .react-switch-button {
left: calc(100% - 2px);
transform: translateX(-100%);
}
  
.react-switch-label:active .react-switch-button {
width: 30px;
}
`