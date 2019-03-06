import React, { Component } from "react"
import EventCard from "./EventCard";
import "./Event.css"

export default class EventList extends Component {
    render() {
        return (
            <div className="eventsContainer">
                {this.props.events.map(e => <EventCard key={e.id} event={e}  deleteEvent={this.props.deleteEvent}/>)}
            </div>
        )
    }
}