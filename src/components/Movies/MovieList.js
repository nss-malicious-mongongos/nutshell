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
            <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/Movies/new")}
                        }>
                    Add Movie
                </button>
            </div>
            <article className="movies">
                {
                    this.props.movies.map(movies =>
                        <MovieCard {...this.props}
                        key={`Movie-${movies.id}`}
                            movies={movies}
                            deleteMovie={this.props.deleteMovie}
                            />
                    )
                }
            </article>
            </React.Fragment>
        )
    }
}

export default MovieList