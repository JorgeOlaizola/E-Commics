import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'
import {
    getFavorites,
    handleFavorites 
} from '../../store/actions/normalUsersActions'



const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const DataSection = styled.div`
    width: 60%;
    display: flex;
    margin: 20px 0;
    border-style: solid;
    border-width: 1px;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
`

const WelcomeMessage = styled.h1`
    ${'' /* font-size: 2rem; */}
    ${'' /* color: #ED2024; */}
`


const DataColumn = styled.div`
    width: 250px;
    margin: 10px;
`

const DataText = styled.p`
    ${'' /* font-size: 1rem; */}
    ${'' /* color: #000; */}
    ${'' /* margin: 2.5px 0; */}
    ${'' /* line-height: 150%; */}
`

const StyledButton = styled.button`
    width: 200px;
    margin-top: 5px;

`

const ProfileImg = styled.img`
    border-radius: 50%;
    width: 150px;
    height: 150px;
`

const ProductConteiner = styled.div`
width: 70%;
height: 200px;
border: 1px solid grey;
display: flex;
padding: 30px;
margin: 10px;
border-radius: 0.5rem 0.5rem;
justify-content: start;
align-items: center;
`

const ProductInfoConteiner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80%;
`


const UserPanelFavorites = () => {
    const userData = useSelector(state => state.user.userData.user);
    const dispatch = useDispatch()
    useEffect(() => {
        if(userData.log === false) {
            window.location.href = "/"
        }
        dispatch(getFavorites(userData.id))
}, []);

    return (
        <StyledContainer>
            <DataSection>
                Favoritos
            </DataSection>
            { userData.favorites.length ? userData.favorites.map(f => 
            <ProductConteiner>
                <ProfileImg src={f.image}></ProfileImg>
                <ProductInfoConteiner>
                    <h3>{f.title} </h3>
                    <span> Precio: {f.price}$</span> 
                    <span> Categoría: {f.category.title}</span>
                    <button onClick={() => dispatch(handleFavorites(userData.id, f._id)) } >Eliminar favorito</button>
                </ProductInfoConteiner>
            </ProductConteiner>) 
            : <div>Todavía no tienes productos en favoritos.</div>}
        </StyledContainer>
    )
}

export default UserPanelFavorites;