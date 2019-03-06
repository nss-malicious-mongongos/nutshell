import React, { Component } from "react"
import EventCard from "./EventCard";
import "./Event.css"

export default class EventList extends Component {
    render() {
        return (
            <React.Fragment>
                <h2 className="events-header">Events</h2>
                <div className="new-event-btn">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/newEvent")
                        }}>Add New Event</button>
                </div>
                <div className="eventsContainer">
                    {this.props.events.map(e =>
                        <EventCard key={e.id}
                            event={e}
                            deleteEvent={this.props.deleteEvent}
                        />)}
                </div>
            </React.Fragment>
        )
    }
}