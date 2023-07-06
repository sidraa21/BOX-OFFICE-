import { useState } from 'react';
//import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { searchForShows ,searchForPeople } from '../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
import { TextCenter } from '../components/common/TextCenter';
//import styled , { css ,ThemeProvider } from 'styled-components' ;
 

/*const theme = {
  colors: {
      main: 'red',
  },
};
const Container = styled.div`
  text-align: center;
`

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: ${(props) => props.theme.colors.main};
  margin: 0 1em;
  padding: 0.25em 1em;


  ${props =>
    props.primary &&
    css`
      background: '#BF4F74';
      color: green;
    `};



${props =>
  props.$fontSize &&
  css`
    font-size: ${props.$fontSize}px;
  `};
`;
*/
const Home = () => {
  const [filter, setFilter] = useState(null);
 
  const { data: apiData , error: apiDataError} = useQuery({
      queryKey: ['search', filter],
      queryFn: () => filter.searchOption === 'shows' ? searchForShows(filter.q) : searchForPeople(filter.q),
      // ⬇️ disabled as long as the filter is empty
      enabled: !!filter,
      refetchOnWindowFocus: false,
  });
 
 
  
  const onSearch = async ({q, searchOption}) => {
    setFilter({q , searchOption});
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error occurred : {apiDataError.message}</TextCenter>;
    }

    if(apiData?.length === 0){
      return <TextCenter>No Results</TextCenter>;
    }
    if (apiData) {
      return  apiData[0].show ? (
      <ShowGrid shows={apiData}/> 
      ) :( 
      <ActorsGrid actors={apiData}/>
       );
    }
    return null;
  };
      
  return (
    <div> 

          <SearchForm onSearch= {onSearch}/>
    

      <div>{renderApiData()} </div>
    </div>
  );
};
export default Home;
