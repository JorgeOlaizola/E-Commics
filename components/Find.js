import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button  } from './globalStyle'
import { SearchIcon } from '@heroicons/react/outline'
import { searchByName, getFilteredProducts } from '../store/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'



const FindDiv = styled.div`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.fontColor};
  ${'' /* @media (max-width: 480px) {
    border: none;
  } */}
`;


const InputText = styled.input`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.backgroundInput};
  width: 300px;
  height: 25px;
  border: none;
  @media (max-width: 768px) {
    max-width: 200px;
    }
  @media (max-width: 768px) {
  max-width: 200px;
  }
  @media (max-width: 480px) {
  max-width: 300px;
  ${'' /* display: none; */}
  }
  @media (max-width: 390px) {
  max-width: 260px;
  }
  @media (max-width: 320px) {
  max-width: 240px;
  }
`

const FindButton = styled.button`
border: none; 
background: #C0F0FF;
height: 25px;
cursor: pointer;
&:hover{
  background: #7ECAFF;
}
&:active{
  background: #0096FF;
}
${'' /* @media (max-width: 480px) {
  background: none;
  color: ${(props) => props.theme.fontColor};
} */}
`
const Find = () => {
    const filters = useSelector(state => state.product.filters)
    const router = useRouter()

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getFilteredProducts(filters))
        router.push('/search')
    }

    function handleChange(event) {
        dispatch(searchByName(event.target.value))
      }

    const dispatch = useDispatch()
    return (
        <div >
        <form className="" onSubmit={(e) => handleSubmit(e)}>
        <FindDiv>
          <InputText
    
            type="text"
            id="findProduct"
            autoComplete="on"
            placeholder="Buscar producto"
            onChange={(e) => handleChange(e)}
          />
          <FindButton type="submit" >
              <SearchIcon className="findIcon"/>
              {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
          </FindButton>
        </FindDiv>

      </form>
        </div>
    )
}

export default Find;
