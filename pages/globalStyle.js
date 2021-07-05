import { createGlobalStyle } from 'styled-components'
import styled from "styled-components";


export const lightTheme = {
    body: '#fff',
    fontColor: '#000'
}

export const darkTheme = {
    body: '#000',
    fontColor: '#fff'
}

export const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

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
	font: inherit;
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
html,
body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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

button {
	margin: 2rem;
}


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