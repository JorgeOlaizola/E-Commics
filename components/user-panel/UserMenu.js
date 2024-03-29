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
import {MenuContainer, MenuTrigger, MenuTriggerSpan, MenuTriggerImg, Menu, NotifMenu, MenuUl, MenuLi, MenuButton, MenuButtonSwitch, ButtonOnClose, NotifMenuButton} from './UserStyles';
import { LigthDarkThemeDiv, OptionButton, StyledLink } from '../globalStyle';
import styled from 'styled-components'
import { SearchIcon, ShoppingCartIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { AiOutlineNotification }  from 'react-icons/ai';
import { AiFillNotification }  from 'react-icons/ai';
import { useRouter } from 'next/router';
import {deleteNotification} from '../../store/actions/normalUsersActions'


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

const NotifCounter = styled.span`
  position: absolute;
  font-family: ubuntu;
  top: -8px;
  left:-3px;
  background: #E10000;
  padding: 1px 4px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  &:hover{
    background: #FF0000;
    }
`

const ImgNotif = styled.img`
width: 40px;
height: 40px;

`
const NotifContainer = styled.div`
width:100%;
height: 100%;
margin-top: 1rem;
margin-bottom:0.5rem;
display:flex;
flex-direction: column;
align-items:center;
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
  function handleOnCloseNotifications(userid, notid){
    dispatch(deleteNotification(userid, notid))
  }

  function countProductsCart(){
    let product= 0;
    if(cartItems.length){
      cartItems.forEach((e)=>{
        product += e.products.length
      })
      return product
    }
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
                  <div>
                    <Image 
                    className="avatar" 
                    src={userData.user.avatar}
                    alt="User avatar"
                    width={'25px'}
                    height={'25px'}
                    />
                    <style jsx global>{`
                      .avatar {
                        border-radius: 50%;
                      }
                    `}</style>
                  </div>
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
            <div style={{position: "relative"}}>{cartItems.length ? <CartCounter> {countProductsCart()} </CartCounter> : <></>}</div>
          </div>
        </Link>
        
            {
                userData.log === false ?
                <>
                </>
                :
                <div>
            <MenuTrigger onClick={onClickNotif}>
              { userData.user.notifications.length > 0 ? <SuperNotificationFull /> : <SuperNotification />}
              <div style={{position: "relative"}}>{userData.user.notifications.length ? <NotifCounter> {userData.user.notifications.length} </NotifCounter> : <></>}</div>
            </MenuTrigger>
            <NotifMenu
            style={{zIndex: '10'}}
            ref={dropdownNot}
            className={`menu ${isNotif ? "active" : "inactive"}`}
            >
            
            
            <MenuUl>
            <MenuSignNotif></MenuSignNotif>
            { userData && userData.user.notifications.length > 0 ?
              userData.user.notifications.map(n => {
                return (
                  <MenuLi key={n._id}>
                    <NotifContainer>
                      <ButtonOnClose 
                       onClick={()=> handleOnCloseNotifications(userData.user.id, n._id)}
                      >
                        <span style={{fontSize:'1rem'}}>x</span>
                      </ButtonOnClose>
                      <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                      <ImgNotif src={n.img}/>
                        <NotifMenuButton onClick={()=> router.push(`${n.link}`)}>{n.content}</NotifMenuButton>
                        
                      </div>
                    </NotifContainer>

                  </MenuLi>
                )
              })
            : 
            <MenuLi>
              <NotifContainer>
                    <MenuButton>No tienes notificaciones</MenuButton>
              </NotifContainer>
            </MenuLi>
          }

            </MenuUl>
            </NotifMenu>
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