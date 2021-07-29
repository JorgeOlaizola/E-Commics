import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { Input, GradientBorder, DisableBorder, InputDisable } from './globalStyle';
import {FormContainer, LogInForm, FormLabel, FormInputs, FormInput, FormSpan, Eye, OptionInput} from './user-panel/UserStyles.js';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PacmanLoader from "react-spinners/PacmanLoader";

export const ProcessedFaEye = styled.div`
    position: relative;
    left: 248px;
    top: -19px;
    font-size: 90%;
    color: grey;
    &:hover {
    color: black;
    cursor: pointer;
  }
` 

const SignUp = ({onClose}) => {
    const [newUser, setNewUser] = useState({
        name: "",
        surname: "",
        nickname: "",
        email: "",
        avatar: "",
        password: "",
        password2: "",
        locationId: `${process.env.DEFAULT_LOCATION}`
    })
    const [thanks, setThanks] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    const [imageSelected, setImageSelected] = useState("");
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const [errorName, setErrorName] = useState("");
    const [errorS, setErrorS] = useState("");
    const [errorNickname, setErrorNickname] = useState("");
    const [errorEmail, setErrorEmail] = useState(""); 
    const [errorPassword, setErrorPassword] = useState(""); 
    const [errorConfirm, setErrorConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const locations = useSelector(state => state.user.locations)
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
        if(value.length < 6) {
            setErrorNickname('↑ El usuario debe contener al menos 6 caracteres');
        }
        else {
            setErrorNickname('');
        }
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
    function validateLocation(value) {
        setNewUser(prevState =>
            ({...prevState, locationId: value}));
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
    function handleImage(e) {
        e.preventDefault();
        setImageSelected(e.target.files[0])
    }
    const mostrar = (i) => {
        const objectURL = URL.createObjectURL(imageSelected[i])
        return objectURL
    }
    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        if(!imageSelected){
            let respuesta = {
                ...newUser,
                avatar: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            axios.post('/api/users/signUp', respuesta)
            .then(function(response) {
                response.data.error_msg && alert(response.data.error_msg)
                response.data.success_msg
                }).catch(error => console.error(error))
        }
        if (imageSelected) {
            const fromData = new FormData()
            fromData.append("file", imageSelected)
            fromData.append("upload_preset", process.env.CLOUDINARY_PRESET)
            axios.post( process.env.CLOUDINARY_URL, fromData)
            .then((resp) => {
                let respuesta = {
                    ...newUser,
                    avatar: resp.data.secure_url
                }
                return  axios.post('/api/users/signUp', respuesta)
            })
            .then(function(response) {
                response.data.error_msg && alert(response.data.error_msg)
                response.data.success_msg
            }).catch(error => console.error(error))
        }
        document.body.style.overflow = ""
        setThanks(true)
        setLoading(false);
    }
    const isEnabled = newUser.name.length > 0 && newUser.surname.length > 0 && newUser.nickname.length >= 6 && newUser.email.length > 0 && newUser.password.length > 0;
    return (
        <FormContainer >
            {
            loading ? <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: '500px'}}><PacmanLoader color={"#FFE100"} size={30}/></div> :
            thanks  ? <div style={{height: '400px'}}><h2 style={{paddingLeft: '10px'}}>Super! Ya eres miembro de la comunidad de ecommics 🦸 🦹‍♀️ 🦸‍♂️ 🦹‍♂️</h2><br/><h3>Por favor verifica tu cuenta a través del link que enviamos a tu correo electrónico para empezar a disfrutar de E-commics</h3>{/*<SignInForm/>*/}</div> : 
            <>
                <h3 >Únete hoy a ecommics!</h3>
                    <LogInForm onSubmit={(e) => handleSubmit(e)}>
                                <FormInputs>
                                <FormLabel>Nombre *</FormLabel>
                                    <FormInput name="username" value={newUser.name} placeholder="" onChange={(e)=> validateUserName(e.target.value)}/>
                                    {!errorName ? null : <span style={FormSpan}>{errorName}</span>}
                                </FormInputs>
                                <FormInputs>
                                    <FormLabel>Apellido *</FormLabel>
                                    <FormInput name="surname" value={newUser.surname} placeholder="" onChange={(e)=> validateUserS(e.target.value)}/>
                                    {!errorS ? null : <span style={FormSpan}>{errorS}</span>}
                                </FormInputs>
                                <FormInputs>
                                    <FormLabel>Usuario *</FormLabel>
                                    <FormInput name="nickname" value={newUser.nickname} placeholder="" onChange={(e)=> validateUserNickname(e.target.value)}/>
                                    {!errorNickname ? null : <span style={FormSpan}>{errorNickname}</span>}
                                </FormInputs>
                                <FormInputs>
                                    <FormLabel>Email *</FormLabel>
                                    <FormInput name="email" value={newUser.email} placeholder="" onChange={(e)=> validateEmail(e.target.value)}/>
                                    {!errorEmail ? null : <span style={FormSpan}>{errorEmail}</span>}
                                </FormInputs>
                                <FormInputs>
                                    <FormLabel>Localidad *</FormLabel>
                                    <select name="location" value={newUser.location} placeholder="" onChange={(e)=> validateLocation(e.target.value)}>
                                        <option selected value = {process.env.DEFAULT_LOCATION}>Selecciona una localidad</option>
                                        {
                                            locations?.map((l) => <option key={l._id} value={l._id}>{l.location}</option>) 
                                        }
                                    </select>
                                </FormInputs>
                                <FormInputs style={{marginTop: "12px"}}>
                                    <FormLabel>Avatar</FormLabel>
                                    <OptionInput htmlFor="filePicker">
                                    {imageSelected ? "cambiar" : "Elegir archivo" }
                                    </OptionInput>
                                    {imageSelected ?<span style={{color: "#00A0FF"}}>Imagen cargada</span> : null }
                                    <input id="filePicker" style={{visibility:"hidden"}} type={"file"} onChange={handleImage}></input>

                                    </FormInputs>
                                <FormInputs>
                                    <FormLabel style={{marginTop: "-10px"}}>Contraseña *</FormLabel>
                                    <FormInput name="password" type={passwordShown ? "text" : "password"} value={newUser.password} placeholder="" onChange={(e)=> validatePassword(e.target.value)}/>
                                    <ProcessedFaEye onClick={togglePasswordVisiblity}>{!passwordShown ? <FaEye/> : <FaEyeSlash/>}</ProcessedFaEye>
                                    {!errorPassword ? null : <span style={FormSpan}>{errorPassword}</span>}
                                </FormInputs>
                                <FormInputs>
                                    <FormLabel style={{marginTop: "-10px"}}>Confirmar contraseña *</FormLabel>
                                    <FormInput name="confirm" type={passwordShown ? "text" : "password"} value={newUser.confirm} placeholder="" onChange={(e)=> validateConfirm(e.target.value)}/>
                                    {!errorConfirm ? null : <span style={FormSpan}>{errorConfirm}</span>}
                                </FormInputs>
                                <span>(*) campos obligatorios</span>
                                {!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm ?
                                <DisableBorder style={{width: "95%"}}>
                                    <InputDisable type="submit" disabled={!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm}>Registrarse</InputDisable>
                                </DisableBorder>
                                : 
                                <GradientBorder style={{width: "95%"}}>
                                    <Input type="submit" disabled={!isEnabled || errorName || errorS || errorNickname || errorEmail || errorPassword || errorConfirm} >Registrarse</Input>
                                </GradientBorder>
                                }
                            </LogInForm>
            </>}
        </FormContainer>
    )
}

export default SignUp;