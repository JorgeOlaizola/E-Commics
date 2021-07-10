import styled from 'styled-components';


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

export const MenuTriggerImg = styled.img` 
border-radius: 90px;
`

export const Menu = styled.nav`
background: #ffffff;
/* border-radius: 8px; */
position: absolute;
top: 74px;
right: 20px;
width: 170px;
box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
opacity: 0;
visibility: hidden;
transform: translateY(-20px);
transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
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
    border-bottom: 1px solid #dddddd;
`

export const MenuButton = styled.a`
    text-decoration: none;
    color: #808080;
    padding: 15px 20px;
    display: block;
    border: none;
    cursor: pointer;
    font-size: 0.875rem;
    &:hover{
    color: #404040;
    }
    &:active{
    color: #202020;
    }
`
