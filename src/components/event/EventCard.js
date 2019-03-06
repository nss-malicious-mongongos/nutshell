import React, { Component } from "react"
import moment from "moment"

export default class EventCard extends Component {
    render() {
        return (
            <section className="event-card card">
                <div className="event-title-container">
                    <h5 className="event-title card-title">{this.props.event.name}</h5>
                    <h6 className="event-date">{moment(this.props.event.date).format("MMMM DD, YYYY")}</h6>
                </div>
                    <div className="event-location">{this.props.event.location}</div>
                    <div className="event-card-btns">
                        <a href="#" className="event-card-btn">Edit</a>
                        <a href="#" className="event-card-btn" onClick={() => this.props.deleteEvent(this.props.event.id)}>Delete</a>
                    </div>
            </section>
                )
            }
}