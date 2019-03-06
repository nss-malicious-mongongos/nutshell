import React, { Component } from "react"
import MovieManager from "../../modules/MovieManager"

export default class MovieEditForm extends Component {
    // Set initial state
    state = {
      title: "",
      lead: "",
      year: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingMovie = evt => {
      evt.preventDefault()

        const editedMovie = {
          id: this.props.match.params.movieId,
          title: this.state.title,
          lead: this.state.lead,
          year: this.state.year
        };
        console.log(editedMovie)

            MovieManager.updateMovie(editedMovie)
            .then(() => this.props.history.push("/Movies"))
    }


    componentDidMount() {
      MovieManager.get(this.props.match.params.movieId)
      .then(movie => {
        this.setState({
          title: movie.title,
          lead: movie.lead,
          year: movie.year
        });
      });
    }


    render() {
      return (
        <React.Fragment>
          <form className="movieForm">
            <div className="form-group">
              <label htmlFor="title">Movie Title</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="title"
                value = {this.state.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lead">Lead Actor</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="lead"
                value = {this.state.lead}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Release Year</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="year"
                value = {this.state.year}
              />
            </div>
            <button
              type="submit"
              onClick={this.updateExistingmovie}
              className="btn btn-primary"
            >
              Update
            </button>
          </form>
        </React.Fragment>
      );
    }
}