import Container from '../components/Container';
import Filters from '../components/Filters';
import Products from '../components/Products';
import styled  from 'styled-components';

const FiltersProducts = styled.div`
margin:auto;
margin-top: 20px;
width:95%;
height:100%;
display: grid;
grid-template-areas: "asideLeft main" ;
grid-template-columns: 25% auto;
@media (max-width: 900px){
  grid-template-columns: auto;
  grid-template-areas:
  "asideLeft"
  "main";
  justify-content:center;
}



`
//grid-template-columns: 25% auto;

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