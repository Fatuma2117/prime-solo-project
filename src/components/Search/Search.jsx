import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { yellow } from 'material-ui-colors';
import { useState } from "react";
import { useDispatch } from "react-redux";

 function Search() {
  const dispatch = useDispatch();


  const [book, setBook] = useState('');
  const [result, setResult] = useState([]);

  const handleChange=(event)=>{
    const book = event.target.value
       setBook(book)
     }
   
   
     const handleSearch=(event)=>{
       event.preventDefault();
   
       console.log('search bar------->',book)
   
       dispatch({
         type: 'FETCH_API',
         payload: book
       })
   
   
     }



  return (
    <Paper
      component="h4"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' ,marginTop:'20px'}}
      style={{backgroundColor: yellow [500]}}
    >
    
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Book"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange={handleChange}
      />
      <IconButton onClick={handleSearch} type="submit" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
export default Search;