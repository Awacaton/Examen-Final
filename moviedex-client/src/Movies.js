import React from 'react';
import './App.css';

class Movies extends React.Component{
    constructor(props){
       
    }
    return(
            {props.list.map( (movie, index) => {
                return (
                
                    <div>
                        <h1>{movie.id}</h1>
                        <h2> {movie.film_title} </h2>
                        <h3>{movie.year}</h3>
                        <h4>{movie.rating}</h4>
                    </div>
                    
                )   
            })}
    )
}

export default Movies;