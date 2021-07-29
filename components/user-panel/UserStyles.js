import styled from 'styled-components';
import {StyledLink} from '../globalStyle.js'

export const MenuContainer = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;
`
 
export const MenuTrigger = styled.button`
/* border-radius: 90px; */
cursor: pointer;
display: flex;
justify-content: space-between;
align-items: center;
padding: 4px 6px;
${'' /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); */}
border: none;
vertical-align: middle;
transition: box-shadow 0.4s ease;
margin-left: auto; /* Strictly for positioning */
background: none;
&:hover {
}
`

export const MenuTriggerSpan = styled.span `
vertical-align: middle;
font-family: Ubuntu;
font-size: 0.875rem;
margin: 0 10px;
color: ${(props) => props.theme.fontColor};
&:hover{
    color: #0096FF;
}
    @media (max-width: 768px) {
      display: none;
    }
`

export const MenuTriggerImg = styled.div` 
border-radius: 90px;
`

export const Menu = styled.nav`
background: ${(props) => props.theme.backgroundLevel2};
/* border-radius: 8px; */
position: absolute;
top: 40px;
right: 0px;
width: 170px;
box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
opacity: 0;
visibility: hidden;
transform: translateY(-20px);
transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
${'' /* border: 1px solid white; */}
&:active{ opacity: 1;
    visibility: visible;
    transform: translateY(0);}
`

export const MenuUl =styled.ul` 
    list-style: none;
    padding: 0;
    margin: 0;
`

export const MenuLi = styled.li`
    border-bottom: 1px solid ${(props) => props.theme.colorLevel3};
    margin-left: 10px;
    margin-right: 10px;
    position: relative;
    &:last-child {
        border: none;
    }
`

export const MenuButton = styled(StyledLink)`
    color: ${(props) => props.theme.fontColor};
    padding: 15px 20px;
    display: block;
    border: none;
    &:hover{
    color: #0096FF;
    }
    &:active{
    color: #202020;
    }
`
//On close button Notifications
export const ButtonOnClose = styled.button`
    border:none;
    background-color: transparent;
    color: ${(props) => props.theme.colorLevel3};
    align-self:flex-end;
    &:hover{
    color: black;
    }
    &:active{
    color: #202020;
    }



`

export const MenuButtonSwitch = styled(MenuButton)`
    padding: 0px 20px 15px 20px;
`


// Sign Up and Sing in forms

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
` 

export const LogInForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
` 

export const Eye = styled.div`
    position: relative;
    left: -25px;
    font-size: 90%;
    &:hover {
    color: blue;
    cursor: pointer;
  }
` 

export const FormLabel = styled.label`
    display: inline-block;
    font-size: 1rem;
    margin-top: 0.6rem;
`

export const FormInput = styled.input`
    margin-top: 0.4rem;
    width: 100%;
    font-size: 0.8rem;
`

export const FormProductContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content:  space-between;
    margin: 10px 0;
`

export const FormProductInput = styled.input`
    margin-top: 0rem;
    width: 70%;
    flex-grow: 4;
`
export const FormTextarea = styled.textarea`
    margin-top: 0.4rem;
    width: 100%;
    font-family: roboto;
`


export const FormInputs = styled.div`
    display: block;
    padding: 0 10px;
    outline: none;
    border-radius: 2px;
    width: 100%;
`

export const OptionInput  = styled.label`
background: none;
display: inline;
color: ${(props) => props.theme.fontColor};
border: 1px solid ${(props) => props.theme.blueColorHover};
cursor: pointer;
font-size: 0.75rem;
font-family: roboto;
font-weight: 500;
padding: 6px;
margin: 5px;
&:hover {
        color: ${(props) => props.theme.body};
        background: ${(props) => props.theme.blueColorHover};
    }
`

export const FormSpan = {
    fontSize: '0.75rem',
    color: '#FF0000'
}