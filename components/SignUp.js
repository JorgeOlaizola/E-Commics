import { useState } from 'react'
// import { POST_USER_URL } from '../../constants';
import axios from 'axios';
// import { connect } from 'react-redux';
// import { actions } from '../../actions/index';
import styled from 'styled-components'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye } from "@fortawesome/free-solid-svg-icons";
// const eye = <FontAwesomeIcon icon={faEye} />;
import { Input, GradientBorder, DisableBorder, InputDisable } from './globalStyle'
import SignInForm from './SignInForm';
import {FormContainer, LogInForm, FormLabel, FormInputs, FormInput, FormSpan, Eye} from './user-panel/UserStyles.js';



const SignUp = ({onClose}) => {
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        nickname: "",
        email: "",
        avatar: "",
        password: "",
        password2: ""
    })

    const [thanks, setThanks] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);


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
        if(!value){
            setErrorName('↑ El nombre es requerido');
        }
        else if(!/^[-a-zA-Z +]*$/gi.test(value)) {
            setErrorName('↑ El nombre tiene que ser alfabético');
        } else {
            setErrorName('');
        }
        setNewUser(prevState =>
            ({...prevState, name: value}));
    }

    function validateUserS(value) {
        if(!value){
            setErrorS('↑ El apellido es requerido');
        } else if (!/^[-a-zA-Z +]*$/gi.test(value)) {
            setErrorS('↑ El apellido tiene que ser alfabético');
        } else {
            setErrorS('');
        }
        setNewUser(prevState =>
            ({...prevState, surname: value}));
    }

    function validateUserNickname(value) {
        if(!value){
            setErrorNickname('↑ El usuario es requerido');
        } else {
            setErrorNickname('');
        }
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
        if(!value){
            setErrorEmail('↑ El email es requerido');
        } else if(!re.test(value)) {
            setErrorEmail('↑ Por favor ingresar un email válido');
        } else {
            setErrorEmail('');
        }
        setNewUser(prevState =>
            ({...prevState, email: value}));
    }

    function validatePassword(value) {
        if(!value){
            setErrorPassword('↑ La constraseña es requerida');
        } else if(value.length < 8) {
            setErrorPassword('↑ La contraseña debe tener como mínimo 8 caracteres');
        } else {
            setErrorPassword('');
        }
        if (value !== newUser.password2){
            setErrorConfirm('↑ La contraseña no coincide');
        } else {
            setErrorConfirm('');
        }
        setNewUser(prevState =>
            ({...prevState, password: value}));
    }
  
    function validateConfirm(value) {
        
        if (value !== newUser.password){
            setErrorConfirm('↑ La contraseña no coincide');
        } else {
            setErrorConfirm('');
        }
        setNewUser(prevState =>
                ({...prevState, password2: value}));
    }

    function handleSubmit(e) {
  
        e.preventDefault();
        axios.post( process.env.NEXT_PUBLIC_POST_USER_URL, newUser)
          .then(function(response) {
              response.data.error_msg && alert(response.data.error_msg)
              response.data.success_msg && setThanks(true);
              
            //console.log(response);
          }).catch(error => console.error(error))
         // console.log(thanks)
    //    history.push('/thanks');
    // onClose();
    document.body.style.overflow = ""
    }

    const isEnabled = newUser.name.length > 0 && newUser.surname.length > 0 && newUser.nickname.length > 0 && newUser.email.length > 0 && newUser.password.length > 0;

    return (
        <FormContainer >
            {thanks  ? <div style={{height: '500px'}}><h2>Super! Ya eres miembro de la comunidad de ecommics 🦸 </h2><SignInForm/> </div>: <>
                <h2>Únete hoy a ecommics!</h2>
                    <LogInForm onSubmit={(e) => handleSubmit(e)}>
                        <FormInputs>
                           <FormLabel>Nombre</FormLabel>
                            <FormInput name="username" value={newUser.name} placeholder="" onChange={(e)=> validateUserName(e.target.value)}/>
                            {!errorName ? null : <span style={FormSpan}>{errorName}</span>}
                        </FormInputs>
                        <FormInputs>
                            <FormLabel>Apellido</FormLabel>
                            <FormInput name="surname" value={newUser.surname} placeholder="" onChange={(e)=> validateUserS(e.target.value)}/>
                            {!errorS ? null : <span style={FormSpan}>{errorS}</span>}
                        </FormInputs>
                        <FormInputs>
                            <FormLabel>Usuario</FormLabel>
                            <FormInput name="nickname" value={newUser.nickname} placeholder="" onChange={(e)=> validateUserNickname(e.target.value)}/>
                            {!errorNickname ? null : <span style={FormSpan}>{errorNickname}</span>}
                        </FormInputs>
                        <FormInputs>
                            <FormLabel>Email</FormLabel>
                            <FormInput name="email" value={newUser.email} placeholder="" onChange={(e)=> validateEmail(e.target.value)}/>
                            {!errorEmail ? null : <span style={FormSpan}>{errorEmail}</span>}
                        </FormInputs>
                        <FormInputs>
                            <FormLabel>Avatar</FormLabel>
    						<FormInput type="file"/>
    						{/* <button className="" >Subir!</button> */}
    					</FormInputs>
                        <FormInputs>
                            <FormLabel>Contraseña</FormLabel>
                            <FormInput name="password" type={passwordShown ? "text" : "password"} value={newUser.password} placeholder="" onChange={(e)=> validatePassword(e.target.value)}/>
                            {/* <Eye className="far fa-eye" onClick={togglePasswordVisiblity}></Eye> */}
                            {!errorPassword ? null : <span style={FormSpan}>{errorPassword}</span>}
                        </FormInputs>
                        <FormInputs>
                            <FormLabel>Confirmar contraseña</FormLabel>
                            <FormInput name="confirm" type={passwordShown ? "text" : "password"} value={newUser.confirm} placeholder="" onChange={(e)=> validateConfirm(e.target.value)}/>
                            {!errorConfirm ? null : <span style={FormSpan}>{errorConfirm}</span>}
                        </FormInputs>
                        {!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm ?
                        <DisableBorder className="">
                            <InputDisable className="inputbutton" type="submit" disabled={!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm}/>
                        </DisableBorder>
                        : 
                        <GradientBorder className="">
                            <Input className="inputbutton" type="submit" disabled={!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm} />
                        </GradientBorder>
                        }
                    </LogInForm>
            </>}
        </FormContainer>
    )
}

export default SignUp;


//   export default connect(
//     null,
//     {action, action }
//   )(SignUp);


