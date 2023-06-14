import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false);
  const [error,setError]=useState(null);
 async function movieFetchHandler(){
  setLoading(true);
  setError(null);
  try{
 const response= await fetch('https://swapi.dev/api/films')
  if(!response.ok){
    throw new Error('something went wrong ....RETRYING');
  }
  const data =await response.json()
  
  const getMovies=data.results.map((movieData)=>{
    return{
      id:movieData.episode_id,
      title:movieData.title,
      openingText:movieData.opening_crawl,
      
    }
  });
  setMovies(getMovies);
  
  } catch(error){
setError(error.message);
  }
 setLoading(false);

  }

  return (
    <React.Fragment>
      <section>
        <button onClick={movieFetchHandler}>Fetch Movies</button>
      </section>
      <section>
       { !isLoading && movies.length>0 && <MoviesList movies={movies} />}
       {!isLoading && movies.length ===0 && <p>no movies</p>}
       {isLoading && <p>loading</p>}
       {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
