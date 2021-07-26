import styled from "styled-components";
import React, {useEffect, useState} from 'react';
import  ReactDOM  from "react-dom";
import { LigthDarkThemeDiv } from './globalStyle'
import { useDispatch, useSelector } from "react-redux";
import { closeModalAlert } from "../store/actions/modalAlertActions";

// const ModalX = styled.a`

// color: ${(props) => props.theme.colorLevel2};
// border: none;
// cursor: pointer;
// ${'' /* font-size: 0.75rem; */}
// font-family: ubuntu;
// font-weight: 700;
// padding: 0 4px;
// &:hover {
//   background: ${(props) => props.theme.backgroundButton2};
//   color: ${(props) => props.theme.fontColor};
// }
// `
const ModalAlert = () => {
    const show = useSelector(state => state.modalAlert)
    const dispatch = useDispatch()

    
    const handleCloseClick = (e) => {
      e.preventDefault();
      dispatch(closeModalAlert())
      document.body.style.overflow = ""
    };
  
   return (
    <ModalContainer show={!show ? 'none' : 'flex'} style={{zIndex: '1001'}} onClick={(e)=> handleCloseClick(e)}>
      <Modal show={!show ? 'none' : 'flex'}  >{show && show.message}</Modal>
    </ModalContainer>
   )
  };
  
  const ModalContainer = styled.div`
  width:100vw;
  display: ${(props)=>props.show};
  justify-content: center;
  align-items: center;
  
  `
  
  
  const Modal = styled.div`
  
  
  
  
  `
 
  
  export default ModalAlert;