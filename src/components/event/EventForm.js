import React, { Component } from "react"

export default class EventForm extends Component {
    render() {
        return (
            <React.Fragment>
                <label for="name">Name</label>
                <input type="text" id="name" />
                <label for="date">Date</label>
                <input type="date" id="date" />
                <label for="location">Location</label>
                <input type="text" id="location" />
            </React.Fragment>
        )
    }
}