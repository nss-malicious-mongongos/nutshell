import React, { Component } from 'react'
import { Link } from "react-router-dom"
import clap from "./movie.png"

class MovieCard extends Component {

    componentDidMount() {
        console.log(`componentDidMount -- Movie ${this.props.movie.id}`)
    }

    render() {
        console.log(`render -- Movie ${this.props.movie.id}`)

        return (
            <React.Fragment>
                <div key={this.props.Movie.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <img src={clap} className="icon--clap" />
                            <div>{this.props.movie.title}</div>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                    this.props.history.push(`/Movies/${this.props.Movie.id}/edit`);
                                }}
                                >
                                Edit
                            </button>

                            {
                                (this.props.hasOwnProperty("deleteMovie"))
                                    ? <button
                                        onClick={() => this.props.deleteMovie(this.props.movie.id)}
                                        className="card-link">Delete</button>
                                    : null
                            }

                        </h5>
                    </div>
                    <Link className="nav-link" to={`/Movies/${this.props.movie.id}`}>Details</Link>
                </div>

            </React.Fragment>
        )
    }
}

export default MovieCard