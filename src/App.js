import React, { useState,useEffect,useCallback } from 'react';
import FormInput from './components/FormInput';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([]);
  const [isLoading,setLoading]=useState(false);
  const [error,setError]=useState(null);
 
  const movieFetchHandler= useCallback(async function movieFetchHandler(){
    setLoading(true);
    setError(null);
    try{
   const response= await fetch('https://movie-559f1-default-rtdb.firebaseio.com/mymovies')
    if(!response.ok){
      throw new Error('something went wrong ....RETRYING');
    }
    const data =await response.json()
    
    const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
    setMovies(loadedMovies);
    
    } catch(error){
  setError(error.message);
    }
   setLoading(false);
  
    },[])
 
   useEffect(() => {
    movieFetchHandler();
  }, [movieFetchHandler]);
  async function addMovieHandler(movie) {
    const response = await fetch('https://movie-559f1-default-rtdb.firebaseio.com/mymovies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }


  return (
    <React.Fragment>
      <section style={{display:'flex',justifyContent:'center'}}><FormInput onAddMovie={addMovieHandler}/></section>
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
