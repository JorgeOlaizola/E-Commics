import Link from 'next/link';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDetectOutsideClick } from "./useDetectOutsideClick.js";
import { signOut } from '../../store/actions/normalUsersActions.js';
import Modal from './Modal.js';
import React, {useState} from 'react';

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
    <div className="container">
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>Usuario</span>
          <img
            src="https://ecommics.s3.sa-east-1.amazonaws.com/images/superuser.png"
            alt="User avatar"
          />
        </button>
        <nav
          style={{zIndex: '10'}}
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            {
              userData.log === false ?
              <>
                {/* <li>
                <Link href="/signuppage" passHref>
                  <a>Crear cuenta</a>
                  </Link>
                </li> */}
                <div>
                    <button onClick={() => handleClickSignUp()}>Crear cuenta</button>
                    <Modal signType={signType}
                    onClose={() => setShowModal(false)}
                    show={showModal}
                    >
                    </Modal>
                </div>
                <div>
                    <button onClick={() => handleClickSignIn()}>Ingresar</button>
                    <Modal signType={signType}
                    onClose={() => setShowModal(false)}
                    show={showModal}
                    >
                    </Modal>
                </div>
                {/* <li>
                <Link href="/" passHref>
                  <a>Ingresá</a>
                  </Link>
                </li> */}
              </>
              :
              <>
                <li>
                <Link href={`/user/${userData.nickname}`} passHref>
                  <a>Panel de usuario</a>
                </Link>
                </li>
                <li>
                <Link href="/" passHref>
                  <a onClick={() => {handleSignOut()}}>Salir</a>
                </Link>
                </li>
              </>
            }
           <li>
              <a>
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
              </a>
           </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default UserMenu;