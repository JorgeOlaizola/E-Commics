import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GradientBorder, Input, EraseButton  } from '../globalStyle'
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
    ${'' /* border-radius: 50%; */}
    max-width: 150px;
    max-height: auto;
    margin: 0 20px;
`

const ProductConteiner = styled.div`
width: 70%;
height: 100%;
border: 1px solid grey;
display: flex;
padding: 30px;
margin: 10px;
justify-content: start;
align-items: center;
flex-wrap: wrap;
justify-content: space-around;
@media (max-width: 768px) {
    width: 90%;
    }
`

const ProductInfoConteiner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
width: 250px;

`
// const EraseButton = styled.button`
// background: ${(props) => props.theme.backgroundButton2};
// color: ${(props) => props.theme.colorLevel2};
// border: none;
// cursor: pointer;
// font-size: 0.75rem;
// font-family: ubuntu;
// font-weight: 300;
// padding: 4px;
// &:hover {
//         color: ${(props) => props.theme.fontColor};
//         background: ${(props) => props.theme.colorLevel4};
//     }
// `

const UserPanelFavorites = () => {
    const userData = useSelector(state => state.user.userData.user);
    const dispatch = useDispatch()
    useEffect(() => {
        // if(userData.log === false) {
        //     window.location.href = "/"
        // }
        dispatch(getFavorites(userData.id))
}, [dispatch]);

const HandleToggleFavorite = (userDataId, Fid) => {
    
    dispatch(handleFavorites(userDataId, Fid))
    dispatch(getFavorites(userDataId))

}

    return (
        <StyledContainer>
            { userData.favorites.length ? userData.favorites.map(f => 
            <ProductConteiner key={f._id}>
                <ProfileImg src={f.image[0]}></ProfileImg>
                <ProductInfoConteiner>
                {/* <Link href={'/detail/[productDetail]'} as={`/detail/${f._id}` } passHref> */}
                    <h3>{f.title} </h3>
                {/* </Link> */}
                    <span> <strong>Precio:</strong> ${f.price}</span> 
                    <span> <strong>Descripción:</strong> {f.description}</span>
                    <EraseButton style={{marginTop: "10px"}} onClick={() => HandleToggleFavorite(userData.id, f._id) } >Eliminar favorito</EraseButton>
                </ProductInfoConteiner>
            </ProductConteiner>) 
            : <div>Todavía no tienes productos en favoritos.</div>}
        </StyledContainer>
    )
}

export default UserPanelFavorites;