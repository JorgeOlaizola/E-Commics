import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    resetFilters,
    searchByUser,
    getOwnProducts
} from '../../store/actions/productActions'
import styled from 'styled-components';
import { GradientBorder, Input  } from '../globalStyle'
import { useRouter } from 'next/router'

const StyledContainer = styled.div`
    margin-top: 30px;
    width: 100%;
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
    width: 150px;
    height: 150px;
`

//Products styles

const ProductConteiner = styled.div`
width: 70%;
height: 200px;
border: 1px solid grey;
display: flex;
padding: 30px;
margin: 10px;
justify-content: start;
align-items: center;
`

//Product conteiner for the info
const ProductInfoConteiner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 80%;
`

const Advertise = styled.p`
    color: ${(props) => props.theme.blueColor};
    display: flex;
    align-items: center;
`

const UserPanelPublications = () => {
    const userData = useSelector(state => state.user.userData.user);
    const products = useSelector(state => state.product.ownProducts.products);
    const filters = useSelector(state => state.product.filters);
    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        dispatch(getOwnProducts(userData.id))
        return () => {
            dispatch(resetFilters())
        }
}, []);
    return (
        <StyledContainer>
            {products && products.length > 0 ? products.map(p => 
                <ProductConteiner key={p._id}>
                    <ProfileImg src={p.image[0]}>
                    </ProfileImg>
                    <ProductInfoConteiner>
                    <p><strong>{p.title}</strong></p>
                    <Advertise> Precio: ${p.price}</Advertise> 
                    <Advertise> Categoría: {p.category.title}</Advertise>
                    <span><br/>Puedes editar tus publicaciones ingresando a las mismas</span>
                    <GradientBorder>
                        <Input onClick={() => router.push(`/detail/${p._id}`)}>Ir al producto</Input>
                    </GradientBorder>
                    {/* <button onClick={() => router.push(`/detail/${p._id}`)}>Modificar</button> */}
                    </ProductInfoConteiner>
                </ProductConteiner>
            ) : <div>Todavía no tienes ningún producto</div> }
            <Link href="/addproduct" passHref >
                <GradientBorder>
                    <Input>Crear publicacion</Input>
                </GradientBorder>
            </Link>    
        </StyledContainer>
    )
}

export default UserPanelPublications;

