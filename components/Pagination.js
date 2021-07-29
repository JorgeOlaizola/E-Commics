import styled from 'styled-components' 
import { useSelector, useDispatch }  from 'react-redux'
import { useEffect, useState } from 'react'
import { getFilteredProducts } from '../store/actions/productActions'
import { StyledLink } from './globalStyle';

const DivPagination = styled.div`
    margin-left: 20px;
    margin-top: 40px;
`

const PaginateArrow = styled(StyledLink)`
    padding: 0 20px;
    cursor: pointer;
`

const DisablePaginateArrow = styled(StyledLink)`
    padding: 0 20px;
    cursor: not-allowed;
    color: grey;
    ${'' /* visibility: hidden; */}
    &:hover{
      color: grey;
    }
    &:active{
    color: grey;
    }
`


const PaginateNum = styled.span`
    padding: 0 20px;
`

const Pagination = () => {
    const [num, setNum] = useState(1)
    const [disableBeforeArrow, setDisableBeforeArrow] = useState(false)
    const [disableAfterArrow, setDisableAfterArrow] = useState(false)
    const filters = useSelector(state => state.product.filters)
    // const products = useSelector(state => state.product.products);
    const totalProducts = useSelector(state => state.product.totalProducts);
    const itemPerPage = useSelector(state => state.product.itemPerPage);

    

    const dispatch = useDispatch()

    // function handleSubmit(event) {

    // }

    const handleClickPlus = (e) => {
        e.preventDefault();
        let pageFilters = {
            ...filters
        }
        pageFilters.page = num+1;

        if ((num+1) > Math.ceil(totalProducts / itemPerPage)  ){
            
            return
        }
        setNum(num+1)
        dispatch(getFilteredProducts(pageFilters))
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        if (num === 1){
            setDisableBeforeArrow(true)
        }
        if (num > 1){
            setDisableBeforeArrow(false)
        }
    }, [num]
    )

    useEffect(() => {
        if (totalProducts < itemPerPage ){
            setDisableAfterArrow(true)
        }
        // if ((num) === (totalProducts / itemPerPage)  ){
        //     setDisableAfterArrow(true)
        // }
        if ((num) === Math.ceil(totalProducts / itemPerPage)  ){
            setDisableAfterArrow(true)
        }
        if ((num) < Math.ceil(totalProducts / itemPerPage)  ){
            setDisableAfterArrow(false)
        }
    }, [num, totalProducts]
    )


    const handleClickMinus = (e) => {
        e.preventDefault();
        let pageFilters = {
            ...filters
        }
        

        if (num > 0){
            pageFilters.page = num-1;
            setNum(num-1)
            dispatch(getFilteredProducts(pageFilters))
            window.scroll({top: 0, left: 0, behavior: 'smooth' })
        } 

    }

    return (
        <DivPagination>
            {disableBeforeArrow ? <DisablePaginateArrow>✕ anterior</DisablePaginateArrow> : <PaginateArrow onClick={handleClickMinus}>← anterior</PaginateArrow>}
            <PaginateNum>{num}</PaginateNum>
            {disableAfterArrow ? <DisablePaginateArrow>siguiente ✕</DisablePaginateArrow> : <PaginateArrow onClick={handleClickPlus}>siguiente →</PaginateArrow>}
        </DivPagination>
    )
}

export default Pagination;
