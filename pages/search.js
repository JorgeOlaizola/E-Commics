import Container from '../components/Container';
import Filters from '../components/Filters';
import Products from '../components/Products';
import styled  from 'styled-components';

const FiltersProducts = styled.div`
display: flex;
flex-direction: raw;
`

const Search = () => {
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

export default Search;