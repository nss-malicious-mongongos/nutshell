import React, { Component } from 'react'
import MovieCard from './MovieCard'

class MovieList extends Component {

    componentDidMount() {
        console.log("componentDidMount -- MovieList")
    }

    render() {
        const userId = parseInt(sessionStorage.getItem("credentials"))
        console.log(userId)
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
                <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/")}
                        }>
                    Back to Dashboard
                </button>
            </div>
            <article className="card movies card">
                {
                    this.props.movies.filter(movies => movies.userId === userId)
                    .map(movies =>
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