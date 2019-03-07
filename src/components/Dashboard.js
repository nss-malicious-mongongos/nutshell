import React, { Component } from "react"
import ChatList from "./chat/ChatList"
import FriendList from "./friends/FriendList";
import ArticleList from "./news/NewsList"
import MovieList from "./Movies/MovieList"
import TaskList from "./task/TaskList"

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            <React.Fragment>
                <ChatList messages={this.props.messages}
                    deleteMessage={this.props.deleteMessage}
                    updateMessage={this.props.updateMessage}
                    {...this.props}
                    history={history}
                />
                <MovieList {...this.props} />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
                <ArticleList {...this.props} />
                <FriendList friends={this.props.friends} users={this.props.users} history={history} deleteFriend={this.props.deleteFriend} />
        
            </React.Fragment>
        )
    }
}
