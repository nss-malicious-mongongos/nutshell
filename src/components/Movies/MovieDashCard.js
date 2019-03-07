import React, { Component } from 'react'
import { Link } from "react-router-dom"
import clap from "./movie.png"
import "./movie.css"

class MovieDashCard extends Component {

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
                        <ul>
                            <li>{this.props.movies.title}</li>
                        </ul>
                        </h5>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

export default MovieDashCard