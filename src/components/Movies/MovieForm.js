import React, { Component } from "react";
import "./movie.css";
import moment from 'moment'

export default class MovieForm extends Component {
  // Set initial state
  state = {
    title: "",
    lead: "",
    year: "",
    userId: "",
    timestamp: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  }

  /*
        Local method for validation, creating Movie object, and
        invoking the function reference passed from parent component
     */
  constructNewMovie = evt => {
    evt.preventDefault()
      const Movie = {
        title: this.state.title,
        lead: this.state.lead,
        year: this.state.year,
        userId: parseInt(sessionStorage.getItem("credentials")),
        timestamp: moment().format('LLL')
      }

      // Create the Movie and redirect user to Movie list
      this.props
        .addMovie(Movie)
        .then(() => this.props.history.push("/"));
  }

  render() {
    return (
      <React.Fragment>
        <form className="MovieForm">
          <div className="form-group">
            <label htmlFor="title">Movie Title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              placeholder="title"
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
              placeholder="lead"
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year of Release</label>
            <input
              type="number" min="1900" max="2099" step="1"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="year"
              placeholder="year"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewMovie}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}