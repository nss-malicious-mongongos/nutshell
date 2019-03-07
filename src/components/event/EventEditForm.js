import React, { Component } from "react"
import EventManager from "../../modules/EventManager"

export default class EventEditForm extends Component {

    state = {
        eventName: "",
        eventDate: "",
        eventLocation: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingEvent = evt => {
        evt.preventDefault();
        if (this.state.eventName === "" || this.state.eventLocation === "" || this.state.eventDate === "") {
            window.alert("All fields are required")
        } else {
            const editedEvent = {
                userId: parseInt(sessionStorage.getItem("credentials")),
                name: this.state.eventName,
                date: this.state.eventDate,
                location: this.state.eventLocation,
                id: this.props.match.params.eventId
            }
            this.props.updateEvent(editedEvent)
            this.props.history.push("/")
        }
    }

    componentDidMount() {
        EventManager.get(this.props.match.params.eventId)
            .then(event => {
                this.setState({
                    eventName: event.name,
                    eventDate: event.date,
                    eventLocation: event.location
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <form className="eventForm">
                    <div className="event-form">
                        <div className="form-group" >
                            <label htmlFor="name">Name</label>
                            <input type="text"
                                id="eventName"
                                onChange={this.handleFieldChange}
                                value={this.state.eventName} />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="date">Date</label>
                            <input type="date"
                                id="eventDate"
                                onChange={this.handleFieldChange}
                                value={this.state.eventDate}
                            />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="location">Location</label>
                            <input type="text"
                                required
                                id="eventLocation"
                                onChange={this.handleFieldChange}
                                value={this.state.eventLocation} />
                        </div>
                    </div>
                    <button type="submit"
                        className="btn btn-success create-event-btn"
                        onClick={this.updateExistingEvent}
                    >
                        Update
                    </button>
                </form>
            </React.Fragment>
        )
    }
}