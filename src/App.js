import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false)
 async function movieFetchHandler(){
  setLoading(true);
  const response= await fetch('https://swapi.dev/api/films')
  const data =await response.json()
  const getMovies=data.results.map((movieData)=>{
    return{
      id:movieData.episode_id,
      title:movieData.title,
      openingText:movieData.opening_crawl,
      
    }
  });
  setMovies(getMovies);
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
      </section>
    </React.Fragment>
  );
}

export default App;
