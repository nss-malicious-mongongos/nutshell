import React, { Component } from 'react'
import clap from "./movie.png"
import "./movie.css"

class MovieCard extends Component {

    componentDidMount() {
        console.log(`componentDidMount -- Movie ${this.props.movies.id}`)
    }

    render() {
        console.log(`render -- Movie ${this.props.movies.id}`)

        return (
            <React.Fragment>
                <div key={this.props.movies.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <img src={clap} className="icon--clap" />
                            <div>{this.props.movies.title}</div>
                            <div>{this.props.movies.lead}</div>
                            <div>{this.props.movies.year}</div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/Movies/${this.props.movies.id}/edit`);
                                }}
                                >
                                Edit
                            </button>

                            {
                                (this.props.hasOwnProperty("deleteMovie"))
                                    ? <button
                                        type="button"
                                        onClick={() => this.props.deleteMovie(this.props.movies.id)}
                                        className="btn btn-danger">Delete</button>
                                    : null
                            }

                        </h5>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default MovieCard