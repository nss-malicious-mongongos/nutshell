import React, { Component } from 'react'
import MovieCard from './MovieCard'

class MovieList extends Component {

    componentDidMount() {
        console.log("componentDidMount -- MovieList")
    }

    render() {
        console.log("render -- MovieList")
        return (
            <React.Fragment>
            <div className="centerChildren">
                {/* <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/Movies/new")}
                        }>
                    Add Movie
                </button> */}
            </div>
            <article className="Movies">
                {
                    this.props.Movies.map(Movie =>
                        <MovieCard key={`Movie-${Movie.id}`}
                            Movie={Movie}
                            deleteMovie={this.props.deleteMovie}
                            />
                    )
                }
            </article>
            <div className="centerChildren">
                <button onClick={ () => this.props.loadMovies() }>
                    Reload Movies
                </button>
            </div>
            </React.Fragment>
        )
    }
}

export default MovieList