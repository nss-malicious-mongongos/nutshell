import React, { Component } from 'react'
import MovieDashCard from './MovieDashCard'

class MovieList extends Component {

    componentDidMount() {
        console.log("componentDidMount -- MovieList")
    }

    render() {
        const userId = parseInt(sessionStorage.getItem("credentials"))
        console.log(userId)
        console.log("render -- MovieList")
        return (
            <div>
            <div className="centerChildren">
            <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/Movies/new")}
                        }>
                    Add Movie
                </button>
            </div>
            <article className="card movies card">
                {
                    this.props.movies.filter(movies => movies.userId === userId)
                    .map(movies =>
                        <MovieDashCard {...this.props}
                        key={`Movie-${movies.id}`}
                            movies={movies}
                            deleteMovie={this.props.deleteMovie}
                            />
                    )
                }
            </article>
            <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/Movies")}
                        }>
                    See More Movie Info
                </button>
            </div>
        )
    }
}

export default MovieList