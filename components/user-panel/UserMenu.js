import Link from 'next/link';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDetectOutsideClick } from "./useDetectOutsideClick.js";
import { signOut } from '../../store/actions/normalUsersActions.js';
import { themeToggle } from '../../store/actions/stylesActions.js';
import { showHideModal } from '../../store/actions/stylesActions.js';
import Modal from './Modal.js';
import React, {useState} from 'react';
import { 
  emptyCart 
} from '../../store/actions/cartActions'
import {MenuContainer, MenuTrigger, MenuTriggerSpan, MenuTriggerImg, Menu, MenuUl, MenuLi, MenuButton, MenuButtonSwitch} from './UserStyles';
import { LigthDarkThemeDiv } from '../globalStyle';
import styled from 'styled-components'
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { AiOutlineNotification }  from 'react-icons/ai';
import { AiFillNotification }  from 'react-icons/ai';
import { useRouter } from 'next/router';

const SuperCart = styled(ShoppingCartIcon)`
    width: 20px;
    cursor: pointer;
    color: ${(props) => props.theme.colorLevel2};
    &:hover{
      color: ${(props) => props.theme.fontColor};
    }
`

const SuperNotification = styled(AiOutlineNotification)`
    width: 20px;
    cursor: pointer;
    color: ${(props) => props.theme.colorLevel2};
    &:hover{
      color: ${(props) => props.theme.fontColor};
    }
`
const SuperNotificationFull = styled(AiFillNotification)`
    width: 20px;
    cursor: pointer;
    color: ${(props) => props.theme.colorLevel2};
    &:hover{
      color: ${(props) => props.theme.fontColor};
    }
`

const CartCounter = styled.span`
  position: absolute;
  font-family: ubuntu;
  top: -30px;
  left: 12px;
  background: #E10000;
  padding: 1px 4px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  &:hover{
    background: #FF0000;
    }
`

const UserMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [signType, setSignType] = useState("signIn");

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);
  const router = useRouter()


  const dropdownNot = useRef(null);
  const [isNotif, setIsNotif] = useDetectOutsideClick(dropdownNot, false);
  const onClickNotif = () => setIsNotif(!isNotif);

  const dispatch = useDispatch()

  const userData = useSelector(state => state.user.userData)
  const theme = useSelector(state => state.styles.theme)
  const modal = useSelector(state => state.styles.modal)
  const cartItems = useSelector(state => state.cart.cartItems)

  function handleSignOut() {
    // borrar carrito
      dispatch(signOut())
      dispatch(emptyCart())
  }

  function handleClickSignUp() {
    setSignType("signUp")
    document.body.style.overflow = "hidden"
    onClick()
    dispatch(showHideModal(true))
  }

  function handleClickSignIn() {
    setSignType("signIn")
    document.body.style.overflow = "hidden"
    onClick()
    dispatch(showHideModal(true))
  }
  
  function handleToggle(){
    dispatch(themeToggle())
  }

// function functiontoggle{
//   theme === "light" ? "dark" : "light"
//   themeToggle(payloadtheme)
// }

  return (
    <div>
      <Modal signType={signType}
      onClose={() => dispatch(showHideModal(false))}
      show={modal}
      >
      </Modal>
      <MenuContainer>
            <MenuTrigger onClick={onClick}>
              <MenuTriggerSpan>
                {
                  userData.log === false
                  ?
                    <span>Cuenta</span>
                  :
                    <span>{userData.user.nickname}</span>
                }
              </MenuTriggerSpan>
              {
                  userData.log === false
                  ?
                  <Image 
                  src="/ecommics-riddler.png"
                  alt="User avatar"
                  width={'25px'}
                  height={'25px'}
                />
                  :
                  <Image 
                  src="https://ecommics.s3.sa-east-1.amazonaws.com/images/superuser.png"
                  alt="User avatar"
                  width={'25px'}
                  height={'25px'}
                />
                }

            </MenuTrigger>
        <Menu
          style={{zIndex: '10'}}
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <MenuUl>
          <MenuSignUser></MenuSignUser>
            {
              userData.log === false ?
              <>
                <MenuLi>
                    <MenuButton onClick={() => handleClickSignUp()}>Crear cuenta</MenuButton>
                </MenuLi>
                <MenuLi>
                    <MenuButton onClick={() => handleClickSignIn()}>Ingresar</MenuButton>
                </MenuLi>
              </>
              :
              <>
                <MenuLi>
                  <MenuButton onClick={()=> router.push('/addproduct')}>Nueva publicación</MenuButton>
                {/* <Link href={'/addproduct'} passHref >
                </Link> */}
                </MenuLi>
                <MenuLi>
                  <MenuButton onClick={()=> router.push(`/user/${userData.user.nickname}`)} >Panel de usuario</MenuButton>
                {/* <Link href={'/user/[user]'} as={`/user/${userData.user.nickname}`} passHref >
                </Link> */}
                </MenuLi>
                <MenuLi>
                  <MenuButton onClick={() => {handleSignOut(); setShowModal(false)}}>Salir</MenuButton>
               
                </MenuLi>
              </>
            }
           <MenuLi>
              <MenuButtonSwitch>
                <input 
                onChange={() => {handleToggle()}}
                className="react-switch-checkbox"
                id={`react-switch-new1`}
                type="checkbox"
                checked ={theme === "light" ? false : true}
                />
                <label
                // style={{ background: isOn && '#06D6A0' }}
                className="react-switch-label"
                htmlFor={`react-switch-new1`}
                >
                  <Image 
                  src={'/switch-flash.svg'}
                  width={'30px'}
                  height={'25px'}
                  alt={'logo Flash'}
                  />
                  <Image 
                  src={'/switch-batman.svg'}
                  width={'30px'}
                  height={'22px'}
                  alt={'logo Batman'}
                  />
                <span className={`react-switch-button`} />
                </label>
              </MenuButtonSwitch>
           </MenuLi>
          </MenuUl>
        </Menu>
        
        <Link href="/cart" passHref  >
          <div>
            <SuperCart />
            <div style={{position: "relative"}}>{cartItems.length ? <CartCounter> {cartItems.length} </CartCounter> : <></>}</div>
          </div>
        </Link>
        
            {
                userData.log === false ?
                <>
                </>
                :
                <div>
            <MenuTrigger onClick={onClickNotif}>
              { true ? <SuperNotificationFull /> : <SuperNotification />}
            </MenuTrigger>
            <Menu
            style={{zIndex: '10'}}
            ref={dropdownNot}
            className={`menu ${isNotif ? "active" : "inactive"}`}
            >
            
            
            <MenuUl>
            <MenuSignNotif></MenuSignNotif>
                  <MenuLi>
                    <MenuButton>Notificación 01</MenuButton>
                  </MenuLi>
                  <MenuLi>
                    <MenuButton>Notificación 02</MenuButton>
                  </MenuLi>
                  <MenuLi>
                    <MenuButton>Notificación 03</MenuButton>
                  </MenuLi>
              
            </MenuUl>
            </Menu>
            </div>
            }

      </MenuContainer>
    </div>
  );
}

export default UserMenu;

const MenuSignUser = styled.div`
position: absolute;
width:10px;
height:10px;
background: ${(props) => props.theme.backgroundLevel2};
right: 66px;
top: -5px;
transform: rotate(45deg);
box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.1);
`

const MenuSignNotif = styled.div`
position: absolute;
width:10px;
height:10px;
background: ${(props) => props.theme.backgroundLevel2};
right: 10px;
top: -5px;
transform: rotate(45deg);
box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.1);
`