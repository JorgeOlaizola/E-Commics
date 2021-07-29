import React, { useState } from 'react'; 
import Link from 'next/link';
import styled from 'styled-components';
import { Button  } from './globalStyle';
import { SearchIcon } from '@heroicons/react/outline';
import { searchByName, getFilteredProducts, getTitles, resetFilters } from '../store/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router'
import { IoIosBrowsers } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { FaSearch } from 'react-icons/fa';


const FindDiv = styled.div`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.colorLevel3};
  ${'' /* @media (max-width: 480px) {
    border: none;
  } */}

`;



const InputText = styled.input`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.backgroundLevel2};
  width: 300px;
  height: 25px;
  border: none;
  font-size: 16px;
  @media (max-width: 768px) {
    max-width: 200px;
    }
  @media (max-width: 768px) {
  max-width: 200px;
  }
  @media (max-width: 480px) {
  width: 600px;
  border: 1px solid black;
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
`

const ResFindButton = styled.button`
border: none; 
height: 25px;
cursor: pointer;
margin-right: 15px;
`

const FindDivResp = styled.div`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.body};
  border: 1px solid ${(props) => props.theme.colorLevel3};
  ${'' /* width: 100%; */}
  display: none;
  outline: none;
  padding: 10px 16px;
  height: 60px;
  top: 20px;
  ${'' /* width: 280px; */}

    display: flex;
    align-items: center;
  
`;

const ResInputText = styled.input`
  color: ${(props) => props.theme.fontColor};
  background: ${(props) => props.theme.backgroundLevel2};
  width: 100%;
  height: 50px;
  border: none;
  margin-right: 10px;
  font-size: 16px;
`

const CancelButton = styled.div`
border: none; 
background: none;
height: 25px;
cursor: pointer;
display: flex;
align-items: center;
`

const Find = ({ResNavFalse, ToogleResFind, resFind}) => {
    const filters = useSelector(state => state.product.filters)
    const options = useSelector(state => state.product.search)
    const router = useRouter()
    const [findInput, setfindInput] = useState("")

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getFilteredProducts(filters))
        router.push('/search')
        setfindInput("")
        dispatch(resetFilters())
    }

    function handleChange(event) {
        setfindInput(event.target.value)
        dispatch(searchByName(event.target.value))
        dispatch(getTitles(event.target.value))
      }


    const dispatch = useDispatch()
    return (
        <div >
        <form  style={{width: "100%"}}onSubmit={(e) => handleSubmit(e)} >
        {!resFind ? <FindDiv>
          <InputText
            id="findProduct"
            type="text"
            list="dataInputList"
            autoComplete="off"
            value={findInput}
            placeholder="Buscar producto"
            onChange={(e) => handleChange(e)}
          />
          <datalist id="dataInputList">
            {options && options.length > 0 &&
              options.map((a, i)=>{
                return <option key={a+i} value={a}></option>
              })
            }
          </datalist>
          <FindButton type="submit" >
              <FaSearch className="findIcon"/>
              {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
          </FindButton>
        </FindDiv>
        :
        <FindDivResp>
        <ResInputText
            type="text"
            id="findProduct"
            list="dataInputListResponsive"
            autoComplete="off"
            placeholder="Buscar en ecommics"
            value={findInput}
            onChange={(e) => handleChange(e)}
          />
          <datalist id="dataInputListResponsive">
            {options && options.length > 0 &&
              options.map((a,i)=>{
                return <option key={a+i} value={a}></option>
              })
            }
          </datalist>
          <ResFindButton type="submit" >
              <FaSearch className="findIcon"/>
              {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
          </ResFindButton>
          <CancelButton onClick={()=> ResNavFalse()} >
              <GiCancel/>
          </CancelButton>
        </FindDivResp>}

      </form>
      
        </div>
    )
}

export default Find;
