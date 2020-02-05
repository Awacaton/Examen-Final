import React from 'react';
import './App.css';
import "./Movies.js";


class App extends React.Component {

  constructor( props ){
    super( props );
    this.state = {
      peliculas : [],
      apiURL : "localHost:3030"
    }
  }

  componentDidMount(){
    this.getMetodo()
    this.postMetodo()
  }

  getMetodo(){
    let url = `${this.state.apiURL}/api/moviedex`;
    let settings = {
      method : "GET"

    }
    fetch(url, settings)
    .then(Response =>{
      if(Response.ok){
        return Response.json();
      }
      throw new Error(Response.statusText)
    })
    .then( responseJSON =>{

      this.setState({
        movies : responseJSON
      })
    })
    .catch (error =>{
      console.log(error);
    });

  }

  postMetodo(){
    let url = `${this.state.apiURL}/api/moviedex`;
    let settings = {
      method : "POST"

    }
    fetch(url, settings)
    .then(Response =>{
      if(Response.ok){
        return Response.json();
      }
      throw new Error(Response.statusText)
    })
    .then( responseJSON =>{

      this.setState({
        movies : responseJSON
      })
    })
    .catch (error =>{
      console.log(error);
    });

  }


  render(){
  
    return (
      <div>
 
        <Route path="/movies" render={(props) => <Movies lista={this.state.movies}/>}/>
        <div>
          Film Title: <input type="text" />
          Year: <input type="text" />
          Rating: <input type="text" />
          <button type="submit">submit</button>

        </div>
      </div>
      
    )
  }
}

export default App;
