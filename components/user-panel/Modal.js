import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../SignUp';
import SignInForm from '../SignInForm';
import { LigthDarkThemeDiv } from '../globalStyle'

const ModalX = styled.a`

color: ${(props) => props.theme.colorLevel2};
border: none;
cursor: pointer;
${'' /* font-size: 0.75rem; */}
font-family: ubuntu;
font-weight: 700;
padding: 0 4px;
&:hover {
  background: ${(props) => props.theme.backgroundButton2};
  color: ${(props) => props.theme.fontColor};
}
`

const Modal = ({ show, onSubmitSignUp, onClose, children, title, signType }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
      document.body.style.overflow = ""
    };
  
    const modalContent = show ? (
      <StyledModalOverlay style={{zIndex: '1001'}}>
        <LigthDarkThemeDiv>
          <StyledModal>
            <StyledModalHeader>
              <ModalX href="#" onClick={handleCloseClick}>
                x
              </ModalX>
            </StyledModalHeader>
            {title && <span>{title}</span>}
            <StyledModalBody>
            {children}
            {signType === "signUp" ?  
              <SignUp handleCloseClick={handleCloseClick} onClose={onClose}/> :
              <SignInForm handleCloseClick={handleCloseClick}/>
            }
            </StyledModalBody>
          </StyledModal>
        </LigthDarkThemeDiv>
      </StyledModalOverlay>
    ) : null;
  
    if (isBrowser) {
      return ReactDOM.createPortal(
        modalContent,
        document.getElementById("modal-root")
      );
    } else {
      return null;
    }
  };
  
  const StyledModalBody = styled.div`
    padding-top: 10px;
  `;
  
  const StyledModalHeader = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 25px;
  `;
  
  const StyledModal = styled.div`
    width: 320px;
    height: 100%;
    padding: 15px;
    border: 1 px solid black;
  `;
  const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
  `;
  
  export default Modal;
  