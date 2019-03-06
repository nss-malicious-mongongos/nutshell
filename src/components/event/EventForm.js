import React, { Component } from "react"
import "./Event.css"
export default class EventForm extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="event-form">
                        <label for="name"></label>
                        <input type="text" id="name" placeholder="Name" />
                        <label for="date"></label>
                        <input type="date" id="date" />
                        <label for="location"></label>
                        <input type="text" id="location" placeholder="Location" />
                </div>
                <button className="btn btn-success create-event-btn" onClick={() => addEvent()}>Create Event</button>
            </React.Fragment>
        )
    }
}