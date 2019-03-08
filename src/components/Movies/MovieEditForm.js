import React, { Component } from "react"
import MovieManager from "../../modules/MovieManager";



export default class EditMovieForm extends Component {
    // Set initial state
    state = {
        title: "",
        lead: "",
        year:""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingMovie = evt => {
      evt.preventDefault()

      if (this.state.year === "") {
        window.alert("Please select a year");
      } else {
        const editedMovie = {
          id: this.props.match.params.movieId,
          title: this.state.title,
          lead:this.state.lead,
          year: this.state.year,
          userId: parseInt(sessionStorage.getItem("credentials")),


        };

    this.props.updateMovie(editedMovie)

    .then(() => this.props.history.push("/"))
    }
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
        <>
          <form className="movieForm">
            <div className="form-group">
              <label htmlFor="title">Title</label>
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
            <label htmlFor="lead">Lead</label>
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
            <label htmlFor="year">Year</label>
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
              onClick={this.updateExistingMovie}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </>
      );
    }
}