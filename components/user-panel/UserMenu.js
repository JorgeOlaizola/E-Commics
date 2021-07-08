import Link from 'next/link';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useDetectOutsideClick } from "./useDetectOutsideClick.js";
import { signOut } from '../../store/actions/normalUsersActions.js';

const UserMenu = ({themeToggle}) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const dispatch = useDispatch()

  const userData = useSelector(state => state.user.userData)

  function handleSignOut() {
      dispatch(signOut())
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
          ref={dropdownRef}
          className={`menu ${isActive ? "active" : "inactive"}`}
        >
          <ul>
            {
              userData.log === false ?
              <>
                <li>
                <Link href="/signuppage" passHref>
                  <a>Crear cuenta</a>
                  </Link>
                </li>
                <li>
                <Link href="/" passHref>
                  <a>Ingresá</a>
                  </Link>
                </li>
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