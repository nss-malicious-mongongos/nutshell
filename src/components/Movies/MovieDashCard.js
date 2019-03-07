import React, { Component } from 'react'

class MovieDashCard extends Component {

    componentDidMount() {
        console.log(`componentDidMount -- Movie ${this.props.movies.id}`)
    }

    DashCardLine =  (movies) => {
        return (
        <React.Fragment>
            <div key={this.props.movies.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <div>{this.props.movies.title}</div>
                    </h5>
                </div>
            </div>

        </React.Fragment>
    )
        }

    render() {
        console.log(`render -- Movie ${this.props.movies.id}`)

        return (
            <React.Fragment>
             {this.props.movies.map(movies =>
                DashCardLine(movies))}
            
            </React.Fragment>
        )
    }
}

export default MovieDashCard