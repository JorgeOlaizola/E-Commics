import Link from 'next/link';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDetectOutsideClick } from "./useDetectOutsideClick.js";
import { signOut } from '../../store/actions/normalUsersActions.js';
import { themeToggle } from '../../store/actions/stylesActions.js';
import Modal from './Modal.js';
import React, {useState} from 'react';
import {MenuContainer, MenuTrigger, MenuTriggerSpan, MenuTriggerImg, Menu, MenuUl, MenuLi, MenuButton} from './UserStyles';
import { LigthDarkThemeDiv } from '../globalStyle'
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image'

const UserMenu = () => {
  const [showModal, setShowModal] = useState(false);
  const [signType, setSignType] = useState("signIn");

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const dispatch = useDispatch()

  const userData = useSelector(state => state.user.userData)
  const theme = useSelector(state => state.styles.theme)

  function handleSignOut() {
    // borrar carrito
      dispatch(signOut())
  }

  function handleClickSignUp() {
    setSignType("signUp")
    setShowModal(true)
    document.body.style.overflow = "hidden"
  }

  function handleClickSignIn() {
    setSignType("signIn")
    setShowModal(true)
    document.body.style.overflow = "hidden"
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
                <Image 
                  src="https://ecommics.s3.sa-east-1.amazonaws.com/images/superuser.png"
                  alt="User avatar"
                  width={'25px'}
                  height={'25px'}
                />
            </MenuTrigger>
        <Menu
          style={{zIndex: '10'}}
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <MenuUl>
            {
              userData.log === false ?
              <>
                {/* <li>
                <Link href="/signuppage" passHref>
                  <a>Crear cuenta</a>
                  </Link>
                </li> */}
                <MenuLi>
                    <MenuButton onClick={() => handleClickSignUp()}>Crear cuenta</MenuButton>
                    <Modal signType={signType}
                    onClose={() => setShowModal(false)}
                    show={showModal}
                    >
                    </Modal>
                </MenuLi>
                <MenuLi>
                    <MenuButton onClick={() => handleClickSignIn()}>Ingresar</MenuButton>
                    <Modal signType={signType}
                    onClose={() => setShowModal(false)}
                    show={showModal}
                    >
                    </Modal>
                </MenuLi>
                {/* <li>
                <Link href="/" passHref>
                  <a>Ingresá</a>
                  </Link>
                </li> */}
              </>
              :
              <>
                <MenuLi>
                <Link href={'/user/[user]'} as={`/user/${userData.user.nickname}`} passHref >
                  <MenuButton>Panel de usuario</MenuButton>
                </Link>
                </MenuLi>
                <MenuLi>
                <Link href="/" passHref >
                  <MenuButton onClick={() => {handleSignOut(); setShowModal(false)}}>Salir</MenuButton>
                </Link>
                </MenuLi>
              </>
            }
           <MenuLi>
              <MenuButton>
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
                <span className={`react-switch-button`} />
                </label>
              </MenuButton>
           </MenuLi>
          </MenuUl>
        </Menu>
        <Link href="/" passHref >
                    <ShoppingCartIcon className="cartIcon"/>
                    {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
        </Link>
      </MenuContainer>
    </div>
  );
}

export default UserMenu;