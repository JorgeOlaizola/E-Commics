import styled from 'styled-components';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import SignUp from '../SignUp';
import SignInForm from '../SignInForm';
import { LigthDarkThemeDiv } from '../../pages/globalStyle.js'


const Modal = ({ show, onClose, children, title, signType }) => {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
      setIsBrowser(true);
    }, []);
  
    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
    };
  
    const modalContent = show ? (
      <StyledModalOverlay>
        <LigthDarkThemeDiv>
          <StyledModal>
            <StyledModalHeader>
              <a href="#" onClick={handleCloseClick}>
                x
              </a>
            </StyledModalHeader>
            {title && <StyledModalTitle>{title}</StyledModalTitle>}
            <StyledModalBody>
            {children}
            {signType === "signUp" ?  
              <SignUp handleCloseClick={handleCloseClick}/> :
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
    width: 500px;
    height: 600px;
    padding: 15px;
    border: 1 px solid black;
  `;
  const StyledModalOverlay = styled.div`
    position: absolute;
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
  