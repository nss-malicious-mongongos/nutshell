import React, { Component } from "react"
import EventCard from "./EventCard";
import "./Event.css"
import moment from "moment"

export default class EventList extends Component {

    render() {

        return (
            <div className="overflow-auto" id="events-module">
                <h2 className="events-header">Upcoming Events</h2>
                <div className="new-event-btn">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/newEvent")
                        }}>Add New Event</button>
                </div>
                <div className="eventsContainer">
                    <section className="futureEvents">
                        {this.props.events.map(e =>
                            (e.date < moment().format("YYYY-MM-DD")) ? null :
                                <EventCard {...this.props} key={e.id}
                                    event={e}
                                    deleteEvent={this.props.deleteEvent}
                                />)}
                    </section>

                </div>
            </div>
        )
    }
}