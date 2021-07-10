import Link from 'next/link';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDetectOutsideClick } from "./useDetectOutsideClick.js";
import { signOut } from '../../store/actions/normalUsersActions.js';
import Modal from './Modal.js';
import React, {useState} from 'react';
import {MenuContainer, MenuTrigger, MenuTriggerSpan, MenuTriggerImg, Menu, MenuUl, MenuLi, MenuButton} from './UserStyles';
import { LigthDarkThemeDiv } from '../../pages/globalStyle.js'
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline'


const UserMenu = ({themeToggle}) => {
  const [showModal, setShowModal] = useState(false);
  const [signType, setSignType] = useState("signIn");

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const dispatch = useDispatch()

  const userData = useSelector(state => state.user.userData)

  function handleSignOut() {
      dispatch(signOut())
  }

  function handleClickSignUp() {
    setSignType("signUp")
    setShowModal(true)
  }

  function handleClickSignIn() {
    setSignType("signIn")
    setShowModal(true)
  }


  return (
    <div>
      <MenuContainer>
            <MenuTrigger onClick={onClick}>
              <MenuTriggerSpan>Usuario</MenuTriggerSpan>
              <MenuTriggerImg
                src="https://ecommics.s3.sa-east-1.amazonaws.com/images/superuser.png"
                alt="User avatar"
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
                <Link href={`/user/${userData.nickname}`} passHref>
                  <MenuButton>Panel de usuario</MenuButton>
                </Link>
                </MenuLi>
                <MenuLi>
                <Link href="/" passHref>
                  <MenuButton onClick={() => {handleSignOut()}}>Salir</MenuButton>
                </Link>
                </MenuLi>
              </>
            }
           <MenuLi>
              <MenuButton>
                <input 
                onChange={themeToggle}
                className="react-switch-checkbox"
                id={`react-switch-new1`}
                type="checkbox"
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
        <Link href="/" passHref>
                    <ShoppingCartIcon className="cartIcon"/>
                    {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
        </Link>
      </MenuContainer>
    </div>
  );
}

export default UserMenu;