import React, {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import axios from 'axios'
const OfferGameContainer = styled.div`
width:100vw;
height:100vh;
display:flex;
justify-content:center;
align-items: center;
flex-wrap:wrap;
position:fixed;
z-index:5000;
background-color:red;
padding: 3rem 1rem;
overflow-y: scroll;
`
const Prueba = styled.div`
width:200px;
height:300px;
font-size:5rem;
background-color: blue;
margin 0.5rem;
padding:0.5rem;
display:flex;
justify-content:center;
align-items: center;
z-index:5001;
`

const OfferGameClose = styled.button`
position:absolute;
top:2rem;
right:3rem;
z-index: 99999;
`


export default function OfferGame({handleView , view}) {
    const [active,setActive] = useState(false)
    const [userData, setUserData] = useState('')
    if (typeof window !== "undefined" && userData === ''){
        localStorage.getItem("sessionSaved") ? setUserData(JSON.parse(localStorage.getItem("sessionSaved"))) : null 
    }
    useEffect( ()=>{
            axios.get(`/api/users/discount?userID=${userData.user.id}`)
            .then((r)=>{    console.log(r.data)
                if(!r.data.error_msg) setActive(r.data)
            })
            .catch((e)=>{
                console.log(e)
            })
    },[userData])
    const obj ={
        1:"superman"
    }
    function selectCard (e){
        e.preventDefault()
        //anima la carta
        console.log(obj[e.target.id])
        axios.put(`/api/users/discount?userID=${userData.user.id}&discount=${obj[e.target.id]}`)
        .then((r)=>{
            console.log(r.data)
            setActive(false)
            handleView()
        })
    }
    return (
        <>
        { view &&
            (active ?  
                <>
                <OfferGameClose onClick={handleView}>X</OfferGameClose> 
            <OfferGameContainer >
                <Prueba id="1" onClick={(e) => {selectCard(e) }}>1</Prueba>
            </OfferGameContainer>
            </>
            :
            <>
            <OfferGameClose onClick={handleView}>X</OfferGameClose> 
            <OfferGameContainer >
            <div>Ya has sido eliminado de este mundo, vuelve la semana que viene!</div>
            </OfferGameContainer>
            </>
            )
            
        }
        </>
    )
}
