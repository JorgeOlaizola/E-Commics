import React, { useState } from 'react'
// import { POST_USER_URL } from '../../constants';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { actions } from '../../actions/index';
import styled from 'styled-components'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;
import { Input, GradientBorder, DisableBorder, InputDisable } from '../pages/globalStyle.js'


const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
` 

const LogInForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
` 

const Eye = styled.div`
    position: relative;
    left: -25px;
    font-size: 90%;
    &:hover {
    color: blue;
    cursor: pointer;
  }
` 


const SignUp = () => {
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        nickname: "",
        email: "",
        avatar: "",
        password: "",
        password2: ""
    })

    const [passwordShown, setPasswordShown] = useState(false);

    const [confirm, setPasswordConfirm] = useState("");

    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const [errorName, setErrorName] = useState("");
    const [errorS, setErrorS] = useState("");
    const [errorNickname, setErrorNickname] = useState("");
    const [errorEmail, setErrorEmail] = useState(""); 
    const [errorPassword, setErrorPassword] = useState(""); 
    const [errorConfirm, setErrorConfirm] = useState(""); 


    function validateUserName(value) {
        if(!/^[-a-zA-Z +]*$/gi.test(value)) {
            setErrorName('↑ El nombre tiene que ser alfabético');
        } else {
            setErrorName('');
        }
        setNewUser(prevState =>
            ({...prevState, name: value}));
    }

    function validateUserS(value) {
        if(!/^[-a-zA-Z +]*$/gi.test(value)) {
            setErrorS('↑ El apellido tiene que ser alfabético');
        } else {
            setErrorS('');
        }
        setNewUser(prevState =>
            ({...prevState, surname: value}));
    }

    function validateUserNickname(value) {
        // if(!/^[-a-zA-Z +]*$/gi.test(value)) {
        //     setErrorNickname('↑ El sobrenombre tiene que ser alfabético');
        // } else {
        //     setErrorNickname('');
        // }
        setNewUser(prevState =>
            ({...prevState, nickname: value}));
    }

    function validateEmail(value) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!re.test(value)) {
            setErrorEmail('↑ Por favor ingresar un email válido');
        } else {
            setErrorEmail('');
        }
        setNewUser(prevState =>
            ({...prevState, email: value}));
    }

    function validatePassword(value) {
        if(value.length < 8) {
            setErrorPassword('↑ La contraseña debe tener como mínimo 8 caracteres');
        } else {
            setErrorPassword('');
        }
        if (value !== confirm){
            setErrorConfirm('↑ La contraseña no matchea');
        } else {
            setErrorConfirm('');
        }
        setNewUser(prevState =>
            ({...prevState, password: value}));
    }
  
    function validateConfirm(value) {
        
        if (value !== newUser.password){
            setErrorConfirm('↑ La contraseña no matchea');
        } else {
            setErrorConfirm('');
        }
        setPasswordConfirm(prevState =>
            ({...prevState, confirm: value}));
        setNewUser(prevState =>
                ({...prevState, password2: value}));
    }

    function handleSubmit(e) {
  
        e.preventDefault();
        axios.post( process.env.NEXT_PUBLIC_POST_USER_URL, newUser)
          .then(function(response) {
            console.log(response);
          }).catch(error => console.log(error))
    //    history.push('/thanks');
    }

    const isEnabled = newUser.name.length > 0 && newUser.surname.length > 0 && newUser.nickname.length > 0 && newUser.email.length > 0 && newUser.password.length > 0;

    return (
        <FormContainer >
            <h2>Únete hoy a ecommics!</h2>
                <LogInForm onSubmit={(e) => handleSubmit(e)}>
                    <div>
                       <label className="">Nombre</label>
                        <input name="username" value={newUser.name} placeholder="" onChange={(e)=> validateUserName(e.target.value)}/>
                        {!errorName ? null : <span className="">{errorName}</span>}
                    </div>
                    <div>
                        <label className="">Apellido</label>
                        <input name="surname" value={newUser.surname} placeholder="" onChange={(e)=> validateUserS(e.target.value)}/>
                        {!errorS ? null : <span className="">{errorS}</span>}
                    </div>
                    <div>
                        <label className="">Apodo</label>
                        <input name="nickname" value={newUser.nickname} placeholder="" onChange={(e)=> validateUserNickname(e.target.value)}/>
                        {!errorNickname ? null : <span className="">{errorNickname}</span>}
                    </div>
                    <div>
                        <label className="">Email</label>
                        <input name="email" value={newUser.email} placeholder="" onChange={(e)=> validateEmail(e.target.value)}/>
                        {!errorEmail ? null : <span className="">{errorEmail}</span>}
                    </div>
                    <div className="">
						<p className="">Acá puedes subir tu avatar</p>
						<input type="file" />
						<button className="" >Subir!</button>
					</div>
                    <div>
                        <label className="">Contraseña</label>
                        <input name="password" type={passwordShown ? "text" : "password"} value={newUser.password} placeholder="" onChange={(e)=> validatePassword(e.target.value)}/>
                        <Eye className="far fa-eye" onClick={togglePasswordVisiblity}></Eye>
                        {!errorPassword ? null : <span className="">{errorPassword}</span>}
                    </div>
                    <div>
                        <label className="">Confirmar contraseña</label>
                        <input name="confirm" type={passwordShown ? "text" : "password"} value={newUser.confirm} placeholder="" onChange={(e)=> validateConfirm(e.target.value)}/>
                        {!errorConfirm ? null : <span className="">{errorConfirm}</span>}
                    </div>
                    {!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm ?
                    <DisableBorder className="">
                        <InputDisable className="inputbutton" type="submit" disabled={!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm}/>
                    </DisableBorder>
                    : 
                    <GradientBorder className="">
                        <Input className="inputbutton" type="submit" disabled={!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm}/>
                    </GradientBorder>
                    }
                </LogInForm>
        </FormContainer>
    )
}

export default SignUp;


//   export default connect(
//     null,
//     {action, action }
//   )(SignUp);