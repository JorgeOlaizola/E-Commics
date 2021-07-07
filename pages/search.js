import Container from '../components/Container'
import Filters from '../components/Filters'
import Products from '../components/products'
import styled  from 'styled-components'

const FiltersProducts = styled.div`
display: flex;
flex-direction: raw;
`

export default function Search() {
    return (
      <>
        <Container>
             <FiltersProducts>
            <Filters/>
            <Products/>
            </FiltersProducts>
        </Container>
      </>
    )
}