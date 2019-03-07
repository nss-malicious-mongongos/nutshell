import React, { Component } from "react"
import "./Event.css"
import moment from "moment"

export default class EventForm extends Component {

    state = {
        eventName: "",
        eventLocation: "",
        eventDate: "",
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewEvent = evt => {
        evt.preventDefault();
        if (this.state.eventName === "" || this.state.eventLocation === "" || this.state.eventDate === "") {
            window.alert("All fields are required")
        } else {
            const newEvent = {
                userId: parseInt(sessionStorage.getItem("credentials")),
                name: this.state.eventName,
                date: this.state.eventDate,
                location: this.state.eventLocation
            }
            this.props.addEvent(newEvent)
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <React.Fragment>
                <form className="eventForm">
                    <div className="event-form">
                        <div className="form-group" >
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                required
                                id="eventName"
                                onChange={this.handleFieldChange}
                                placeholder="Name" />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="date">Date</label>
                            <input type="date"
                                required
                                id="eventDate"
                                onChange={this.handleFieldChange}
                            />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="location">Location</label>
                            <input type="text"
                                required
                                id="eventLocation"
                                onChange={this.handleFieldChange}
                                placeholder="Location" />
                        </div>
                    </div>
                    <button type="submit"
                        className="btn btn-success create-event-btn"
                        onClick={this.constructNewEvent}
                    >
                        Submit
                    </button>
                </form>
            </React.Fragment>
        )
    }
}