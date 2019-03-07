import React, { Component } from "react"
import ChatList from "./chat/ChatList"
import ArticleList from "./news/NewsList"
import MovieList from "./Movies/MovieList"
import TaskList from "./task/TaskList"
import FriendList from "./friends/FriendList";

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            <React.Fragment>
                <ChatList messages={this.props.messages}
                    createMessage={this.props.createMessage}
                    deleteMessage={this.props.deleteMessage}
                    updateMessage={this.props.updateMessage}
                    history={history}
                />
                <MovieList {...this.props} />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
                <ArticleList {...this.props}
                    friends={this.props.friends} />

            </React.Fragment>
        )
    }
}
