import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from '../pages/globalStyle.js'
import { SearchIcon } from '@heroicons/react/outline'
import { searchByName, getFilteredProducts } from '../store/actions/productActions.js';
import { useDispatch, useSelector } from 'react-redux';

const Find = () => {
    const filters = useSelector(state => state.product.filters)

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(getFilteredProducts(filters))
    }

    function handleChange(event) {
        dispatch(searchByName(event.target.value))
      }

    const dispatch = useDispatch()
    return (
        <div >
        <form className="" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
          style={{border: "1px solid black", background: "none", width: "300px", height: "25px"}}
            type="text"
            id="findProduct"
            autoComplete="on"
            placeholder="Buscar producto"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" style={{border: "none", background: "#FFC0C0", height: "25px", cursor: "pointer"}}>
              <SearchIcon style={{width: "10px", padding: "0", color: "black"}}/>
              {/* <i class="fa fa-trash-o" aria-hidden="true"></i> */}
              </button>
        </div>

      </form>
        </div>
    )
}

export default Find;