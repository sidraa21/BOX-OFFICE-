import { useState } from 'react';
//import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { searchForShows ,searchForPeople } from '../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
const Home = () => {
  const [filter, setFilter] = useState(null)

  const { data: apiData , error: apiDataError} = useQuery({
      queryKey: ['search', filter],
      queryFn: () => filter.searchOption === 'shows' ? searchForShows(filter.q) : searchForPeople(filter.q),
      // ⬇️ disabled as long as the filter is empty
      enabled: !!filter,
      refetchOnWindowFocus: false,
  });
 
  //const [apiData, setApiData] = useState(null);
  //const [apiDataError, setApiDataError] = useState(null);
  
  //console.log(searchOption);
  
  const onSearch = async ({q, searchOption}) => {
   // ev.preventDefault();
   /* try {
      setApiDataError(null);
      let result;
      if(searchOption === 'shows'){
       result =  await searchForShows(q);
      setApiData(result);
      }else {
         result = await searchForPeople(q);
        setApiData(result);
      }
    } catch (error) {
      setApiDataError(error);
    } */
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <div>Error occurred : {apiDataError.message}</div>;
    }

    if(apiData?.length === 0){
      return <div>No Results</div>
    }
    if (apiData) {
      return  apiData[0].show
       ? ( <ShowGrid shows={apiData}/> )
       :( <ActorsGrid actors={apiData}/>
       );
    }
    return null;
  };
      
  return (
    <div> 
          <SearchForm onSearch= {onSearch}/>
    {/*     
      <form onSubmit={onSearch}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />
        <label>
          Shows 
          <input type="radio" name="search-option" value="shows" checked={searchOption === 'shows'} onChange={onRadioChange}/>
        </label>

        <label>
          Actors
          <input type="radio" name="search-option" value="actors" checked={searchOption === 'actors'} onChange={onRadioChange} />
        </label>
        <button type="submit">Search </button>
  </form> */}
      <div>{renderApiData()} </div>
    </div>
  );
};
export default Home;
