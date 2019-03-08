import React, { Component } from "react"
import ChatList from "./chat/ChatList"
import ArticleList from "./news/NewsList"
import MovieList from "./Movies/MovieList"
import TaskList from "./task/TaskList"
import FriendList from "./friends/FriendList";
import EventList from "./event/EventList"

import "./index.css"

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            // <div className="d-flex flex-wrap h-100" id="dashboard">
            <div id="dashboard" className="text-*-center">
                <ChatList messages={this.props.messages}
                    createMessage={this.props.createMessage}
                    deleteMessage={this.props.deleteMessage}
                    updateMessage={this.props.updateMessage}
                    history={history}
                />
                <FriendList friends={this.props.friends} users={this.props.users} history={history} deleteFriend={this.props.deleteFriend} />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
                <ArticleList {...this.props} />
                <EventList history={this.props.history}
                    events={this.props.events}
                    deleteEvent={this.props.deleteEvent} />
                <MovieList {...this.props} />
        
            </div>
        )
    }
}
