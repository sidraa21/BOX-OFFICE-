import { useState , useEffect } from "react";
import { useSearchStr } from "../lib/useSearchStr";
import  CustomRadio from "./CustomRadio";
const SearchForm = ({onSearch}) => {
    const [searchStr, setSearchStr] = useSearchStr('');
    const [searchOption , setSearchOption] = useState('shows');
    useEffect(() => {
        
    } ,[])
    const onSearchInputChange = ev => {
        setSearchStr(ev.target.value);
      };
    
       const onRadioChange = ev => {
        setSearchOption(ev.target.value)
       };

       const onSubmit = (ev) => {
        ev.preventDefault();
      const options = {
        q: searchStr,
        searchOption
      }
        onSearch(options);
       }
    return (
    <form onSubmit={onSubmit}>
        <input type="text" value={searchStr} onChange={onSearchInputChange} />

        <CustomRadio
        label="Shows"
         name="search-option" 
         value="shows" 
         checked={searchOption === 'shows'} 
         onChange={onRadioChange}
        />
       
       <CustomRadio
        label="Actors"
         name="search-option" 
         value="actors" 
         checked={searchOption === 'actors'} 
         onChange={onRadioChange}
        />
       

     
  </form>
    );
};
export default SearchForm;