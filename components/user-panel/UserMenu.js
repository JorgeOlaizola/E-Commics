import Link from 'next/link';
import React, { useRef } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";

export default function UserMenu({themeToggle}) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

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
            <li>
            <Link href="/" passHref>
              <a href="#">Crear cuenta</a>
              </Link>
            </li>
            <li>
            <Link href="/" passHref>
              <a href="#">Ingresá</a>
              </Link>
            </li>
            <li>
            <Link href="/" passHref>
              <a href="#">Panel de usuario</a>
            </Link>
            </li>
            <li>
            <Link href="/" passHref>
              <a href="#">Salir</a>
              </Link>
            </li>
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
