import React, { Component } from "react"
import EventCard from "./EventCard";
import "./Event.css"
import moment from "moment"

export default class EventList extends Component {
    render() {
        const pastEvents = [];

        return (
            <React.Fragment>
                <h2 className="events-header">Upcoming Events</h2>
                <div className="new-event-btn">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/newEvent")
                        }}>Add New Event</button>
                </div>
                <div className="new-event-btn">
                {this.props.showPastEvents === false ? <a href="#" onClick={this.props.showPastEventsToggle}>Show Past Events</a> : <a href="#" onClick={this.props.showPastEventsToggle}>Hide Past Events</a> }
                </div>
                <div className="eventsContainer">
                    <section className="futureEvents">
                        {this.props.events.map(e =>
                            (e.date < moment().format("YYYY-MM-DD")) ? pastEvents.push(e) :
                                <EventCard key={e.id}
                                    event={e}
                                    deleteEvent={this.props.deleteEvent}
                                />)}
                    </section>
                    {(pastEvents.length > 0 && this.props.showPastEvents === true) ?
                        <React.Fragment>
                            <section className="pastEvents">
                                <hr />
                                <h2 className="events-header">Past Events</h2>
                                {pastEvents.map(e =>
                                    <EventCard key={e.id}
                                        event={e}
                                        deleteEvent={this.props.deleteEvent} />
                                )
                                }
                            </section>
                        </React.Fragment>
                        : (this.props.showPastEvents === true && pastEvents.length === 0) ?
                            <h2 className="events-header">No Past Events</h2>
                            : null
                    }


                </div>
            </React.Fragment>
        )
    }
}