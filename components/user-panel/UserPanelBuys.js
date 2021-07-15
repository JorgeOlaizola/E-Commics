import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'


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

const UserPanelBuys = () => {
    const userData = useSelector(state => state.user.userData);
    useEffect(() => {
        if(userData.log === false) {
            window.location.href = "/"
        }
}, []);


    return (
        <StyledContainer>
            <DataSection>
                compras
            </DataSection>
        </StyledContainer>
    )
}

export default UserPanelBuys;