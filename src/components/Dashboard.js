import React, { Component } from "react"
import ChatList from "./chat/ChatList"
import ArticleList from "./news/NewsList"
import MovieList from "./Movies/MovieList"
import TaskList from "./task/TaskList"
import FriendList from "./friends/FriendList";
import EventList from "./event/EventList"

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            <React.Fragment>
                <ArticleList {...this.props}
                    friends={this.props.friends} />
                <ChatList messages={this.props.messages}
                    createMessage={this.props.createMessage}
                    deleteMessage={this.props.deleteMessage}
                    updateMessage={this.props.updateMessage}
                    history={history}
                />
                <EventList history={this.props.history}
                    events={this.props.events}
                    deleteEvent={this.props.deleteEvent} />
                <FriendList friends={this.props.friends} users={this.props.users} history={history} deleteFriend={this.props.deleteFriend} />
                <MovieList {...this.props} />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
            </React.Fragment >
        )
    }
}
