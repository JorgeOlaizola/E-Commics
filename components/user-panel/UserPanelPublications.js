import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'
import ImageSlider from '../ImageSlider.js';

const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 1024px;
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

const DataColumn = styled.div`
    width: 250px;
    margin: 10px;
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

const UserPanelPublications = () => {
    const userData = useSelector(state => state.user.userData);
    const products = useSelector(state => state.product.products);

    const userProducts= products.filter(p => p.user._id === userData._id)
    // const userProducts= products.forEach(p => console.log(p.user._id))
    console.log(userProducts)


    useEffect(() => {
        if(userData.log === false) {
            window.location.href = "/"
        }
}, []);
console.log(userData)
    return (
        <StyledContainer>
            publicaciones
            <ImageSlider />
            <Link href="/addproduct" passHref replace>
                    <StyledButton>Crear publicacion</StyledButton>
            </Link>    
        </StyledContainer>
    )
}

export default UserPanelPublications;