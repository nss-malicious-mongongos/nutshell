import React, {Component} from "react"
<<<<<<< HEAD
import { Route } from 'react-router-dom'
import MovieManager from "../modules/MovieManager"
import MovieList from "./Movies/MovieList"
=======
import ArticleList from "./news/NewsList";
>>>>>>> articles

export default class Dashboard extends Component {
    state = {
        movies: []
      }
    
      componentDidMount() { 
          console.log("working? working? working?")
        const newState = {}
    
        MovieManager.getAll()
        .then(movies => newState.movies = movies)
      }
    
      
    
  


    render() {
<<<<<<< HEAD
        return  <React.Fragment>
            <Route exact path="/animals" render={(props) => {
                console.log("this kind of exists")
                return <MovieList movies={this.state.movies} />
                            }} />
                            </React.Fragment>
        
                        }}
=======
        return (
            <ArticleList {...this.props} />
        )
    }
}
>>>>>>> articles
