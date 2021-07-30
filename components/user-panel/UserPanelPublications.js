import Link from 'next/link';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    resetFilters,
    searchByUser,
    getOwnProducts
} from '../../store/actions/productActions'
import styled from 'styled-components';
import { GradientBorder, Input, Select, Option } from '../globalStyle'
import { useRouter } from 'next/router'
import axios from 'axios'


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

const DataColumn = styled.div`
    width: 250px;
    margin: 10px;
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

//Products styles

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

//Product conteiner for the info
const ProductInfoConteiner = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: left;
width: 250px;
@media (max-width: 557px) {
    margin-top: 16px;
}
`

const OrderButtons = styled.div`
display: flex;
flex-direction: raw;
`

const Advertise = styled.p`
    color: ${(props) => props.theme.blueColor};
    display: flex;
    align-items: center;
`

const UserPanelPublications = () => {
    const userData = useSelector(state => state.user.userData.user);
    const products = useSelector(state => state.product.ownProducts.ownProducts);
    const dispatch = useDispatch();
    const router = useRouter()

    useEffect(() => {
        dispatch(getOwnProducts(userData.id, 'active'))
}, []);

    const handleSelect = (e) => {
        dispatch(getOwnProducts(userData.id, e.target.value))
    }

    const handleActivation = (e, product) => {
        axios.put('/api/products/ownProducts', { status: e.target.value, productId: product})
        .then(r => {
            if(e.target.value !== 'active'){
            dispatch(getOwnProducts(userData.id, 'active'))
            }
            else{
                dispatch(getOwnProducts(userData.id, 'inactive'))
            }
            alert('Publicación actualizada con éxito')
        })
    }
    return (
        <StyledContainer>
            <Select onChange={handleSelect}>
            <Option value="active">Publicaciones activas</Option>
            <Option value="inactive">Publicaciones desactivadas</Option>
            </Select>
            {products && products.length > 0 ? products.map(p => 
                <ProductConteiner key={p._id}>
                    <ProfileImg src={p.image[0]}>
                    </ProfileImg>
                    <ProductInfoConteiner>
                    <p><strong>{p.title}</strong></p>
                    <Advertise> Precio: ${p.price}</Advertise> 
                    <Advertise> Categoría: {p.category.title}</Advertise>
                    <span><br/>Puedes editar tus publicaciones ingresando a las mismas</span>
                    <OrderButtons>
                    <GradientBorder>
                        <Input onClick={() => router.push(`/detail/${p._id}`)}>Ir al producto</Input>
                    </GradientBorder>
                    <GradientBorder>
                        { p.status === "inactive" ? 
                        <Input onClick={(e) => handleActivation(e, p._id)} value="active">Activar publicación</Input>
                        : <Input onClick={(e) => handleActivation(e, p._id)} value="inactive">Desactivar publicación</Input>}
                    </GradientBorder>
                    </OrderButtons>
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

