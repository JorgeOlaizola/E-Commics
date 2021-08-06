import { useState } from 'react';
import Container from '../components/Container'
import styled, {keyframes} from 'styled-components';
import sugusProfilePicture from '../public/about/sugus.jpeg'
import jereProfilePicture from '../public/about/jeremias.JPG'
import jorgeProfilePicture from '../public/about/jorge.jpeg'
import agusProfilePicture from '../public/about/agusfinal.jpeg'
import matiProfilePicture from '../public/about/mati.jpeg'


import Image from 'next/image'
import {StyledLink} from '../components/globalStyle'
import { GithubButton } from '../components/SignInForm';
import {useRouter} from 'next/router'
import { MenuAlt3Icon } from '@heroicons/react/outline';

const MainContainer = styled.div`
margin: 0 auto;
padding: 30px;
max-width: 960px;
`
const ProfileContainer = styled.div`
width:100%;
display:flex;
flex-wrap:wrap;
@media (max-width:500px){
    align-items:center;
}
`


const Profile = styled.div`
width:400px;
height: 400px;
background-image: url(${(props) => props.bkgImage});
background-size: cover;
margin-right:1rem;
margin-bottom:1rem;

border:1px solid ${(props) => props.theme.colorLevel4};
@media (max-width:500px){
    width:280px;
    height:280px;
}
`




const ActionContainer = styled.div`
min-width:100%;
min-height:100%;
display:flex;
align-items:flex-end;
padding-left:0.5rem;
padding-bottom:0.5rem;
color:transparent;
&:hover{
    color:white;
    transition: all 0.4s ease-in-out;
    background-color: rgba(30,30,30, .6);    
    cursor: pointer;
}
`




    
   



const StyledButton = styled(StyledLink)`
margin-bottom: 5px;
display: inline;
padding-right: 2px;
transition: 0.2s;
font-size:1.4rem;
&:hover {
    color:white;
    padding-right: 7px;
    transition: 0.2s;
}
`




const ArrowSpan = styled.span`
display: inline;
padding-left: 2px;
transition: 0.2s;

font-size:1.4rem;
&:hover {
    padding-left: 7px;
    transition: 0.2s;
}
`

const infoEffect = keyframes`
from {
    top:200px;
    filter: opacity(0%)
  }

  to {
    top:0px;
    filter: opacity(100%)
  }
`
const infoEffectMobile = keyframes`
from{
    filter: opacity(0%)
}
to{
    filter: opacity(100%)
}
`
const SelectContainer=styled.div`

width:100vw;
height:100vh;
background-color: white;
display:flex;

&:hover{
    cursor: crosshair;
}
@media (max-width:500px){
    height:auto;
    flex-direction:column-reverse;
    align-items:center;
}
`
const InfoSelectContainer = styled.div`
height:100%;
width:50%;
display:flex;
flex-direction: column;
justify-content: center;
position: relative;
padding:4rem;
animation: ${infoEffect} 2s ease-out;

@media (max-width:500px){
    width:100%;
    animation: ${infoEffectMobile} 2s ease-out;

}

`
const TitleSelect = styled.h1`

`

const PictureSelectContainer = styled.div`
height:100%;
width:50%;
background-image: url(${(props) => props.bkgImage});
background-size: cover;
background-position:center;
@media (max-width:500px){
    width:250px;
    height: 250px;
    margin-top:2rem;
}

`


const About = () =>{
    const [select, setSelect] = useState({})
    const router = useRouter()
    if(select && select.title){
        return (
            <SelectContainer onClick={()=> setSelect({})}>
                <InfoSelectContainer>
                    <TitleSelect>{select.title}</TitleSelect>
                    <p>{select.text}</p>
                    <div style={{display:"flex", width:'90%', marginTop:'2rem', flexWrap:'wrap'}}>
                        <GithubButton style={{width:"200px"}} onClick={()=> router.push(select.gitHub)}>
                            <Image
                            width={"30px"}
                            height={"30px"}
                            alt={"Github logo"}
                            src={'/github.svg'}
                            />Ver Github
                        </GithubButton>
                        <GithubButton style={{width:"200px"}} onClick={()=> router.push(select.linkedIn)}>
                            <Image
                            width={"20px"}
                            height={"20px"}
                            alt={"Linkedin logo"}
                            src={'/linkedin-5.svg'}
                            /> &nbsp; Ver LinkedIn
                        </GithubButton>
                        
                    </div>
                </InfoSelectContainer>
                <PictureSelectContainer bkgImage={select.image}></PictureSelectContainer>

            </SelectContainer>

        )
    }

    const sugus = {
        title: "Sugus",
        text: 'Hola mira como vuelo, no la podes creer no? y eso que todavía no me viste usar el paquete Adobe, ja se te cae la pera',
        image: sugusProfilePicture.src,
        gitHub: "https://github.com/sugusgrassi",
        linkedIn:"https://www.linkedin.com/in/agustin-grassi/"
    }
    const jere = {
        title: 'Jeremías Folgado',
        text:'Hola soy desarrollador fullstack en javaScript, tengo manejo de distintas librerías y frameworks, me apasiona encontrar soluciones, investigar y aprender. Antes de empezar en la programación estudié Diseño Industrial en productos, es decir que tengo muchos años de entrenamiento en resolución de problemas.',
        image: jereProfilePicture.src,
        gitHub: "https://github.com/jeremiasfolgado",
        linkedIn:"https://www.linkedin.com/in/jeremias-folgado-fullstack-developer/"

    }
    const jorge = {
        title: 'Jorge Olaizola',
        text:'Hola! Soy Jorge. Apasionado por el desarrollo de software, en este proyecto desarrollé múltiples funcionalidades del lado del servidor. Me encanta trabajar en equipos y plantearme nuevos desafíos para constantemente crecer como persona y como profesional. Considero que la comunicación es un elemento fundamental en los grupos de trabajo para lograr mejores resultados, que a su vez significa un crecimiento para todos los participantes del mismo.  Además, me encanta hacer tracking y jugar videojuegos como pasatiempo. No dudes en contactarme si tienes algún desafío para mi carrera como desarrollador!',
        image: jorgeProfilePicture.src,
        gitHub: "https://github.com/JorgeOlaizola/",
        linkedIn:"https://www.linkedin.com/in/jorge-olaizola/"

    }
    const agus = {
        title: 'Agustín Gallego',
        text:'Me llamo Agustín, tengo 23 años y me apasionan los nuevos desafíos. Mi formación académica es en ciencias sociales, pero encontré en el desarrollo web todo un mundo nuevo donde poder llevar al máximo mi creatividad y enfrentar todos los días nuevos retos. Disfruto mucho del desarrollo Front-end, y es allí donde logro combinar mis mejores aptitudes y mis mayores gustos: programar y comunicar ideas.',
        image: agusProfilePicture.src,
        gitHub: "https://github.com/gallegoagustin",
        linkedIn:"https://www.linkedin.com/in/agustin-gallego/"
    }
    const mati = {
        title: 'Matías Cavallo',
        text:'',
        image: matiProfilePicture.src,
        gitHub: "https://github.com/MatiasCavallo",
        linkedIn:"https://www.linkedin.com/in/matias-ezequiel-cavallo/"
    }

    
    return (
        <Container>
            <MainContainer>
                <h2>Sobre el Proyecto</h2>
                <p>E-commics es nuestro proyecto de graduación en Henry, fue desarrollado con Next JS y Mongo DB bajo metodología ágil SCRUM que fue monitoriada diariamente por personal de Henry. E-commics es un market place para todos los amantes y coleccionistas de la cultura Pop. Busca a partir de su interface gráfica jerarquizar los productos y utilizando elementos con fuerte carga semántica establece un vínculo de pertenencia con el usuario. Funcionalmente posee búsqueda predictiva, sistema de notificaciones, validación de cuenta, métodos ágiles de log In y todo lo que un market place real requiere para funcionar. Esperamos que les guste el resultado, para nosotros fue todo un desafío poder realizarlo y gracias a él hoy somos desarrolladores Full Stack en javaScript. </p>
                <h2>Nosotros</h2>
                <ProfileContainer>
                    <Profile bkgImage={sugusProfilePicture.src}>
                        <ActionContainer onClick={()=> setSelect(sugus)}>
                                <StyledButton >Agustin Grassi</StyledButton>
                                <ArrowSpan>→</ArrowSpan>
                        </ActionContainer>
                    </Profile>
                    <Profile bkgImage={jereProfilePicture.src}>
                        <ActionContainer onClick={()=> setSelect(jere)}>
                                <StyledButton >{jere.title}o</StyledButton>
                                <ArrowSpan>→</ArrowSpan>
                        </ActionContainer>
                    </Profile>
                    <Profile bkgImage={jorgeProfilePicture.src}>
                        <ActionContainer onClick={()=> setSelect(jorge)}>
                                <StyledButton >{jorge.title}</StyledButton>
                                <ArrowSpan>→</ArrowSpan>
                        </ActionContainer>
                    </Profile>
                    <Profile bkgImage={agusProfilePicture.src}>
                        <ActionContainer onClick={()=> setSelect(agus)}>
                                <StyledButton >{agus.title}</StyledButton>
                                <ArrowSpan>→</ArrowSpan>
                        </ActionContainer>
                    </Profile>
                    <Profile bkgImage={matiProfilePicture.src}>
                        <ActionContainer onClick={()=> setSelect(mati)}>
                                <StyledButton >{mati.title}</StyledButton>
                                <ArrowSpan>→</ArrowSpan>
                        </ActionContainer>
                    </Profile>
                           

                        

                </ProfileContainer>

           
            </MainContainer>
            

        </Container>
    )
}

export default About;
