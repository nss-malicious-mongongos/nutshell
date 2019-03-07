import React, {Component} from "react"
import FriendList from "./friends/FriendList";
import ArticleList from "./news/NewsList"
import MovieList from "./Movies/MovieList"
import TaskList from "./task/TaskList"

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            //put your components here
            <React.Fragment>
                <FriendList friends={this.props.friends} users={this.props.users} history={history} deleteFriend={this.props.deleteFriend} />
                <ArticleList {...this.props} />
                <MovieList {...this.props} />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
        
            </React.Fragment>
        )
    }
}
