import Container from '../components/Container';
import Filters from '../components/Filters';
import Products from '../components/Products';
import styled  from 'styled-components';

const FiltersProducts = styled.div`
margin-top: 20px;
width:100%;
height:100%;
display: grid;
grid-template-columns: 25% auto;


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