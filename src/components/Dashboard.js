import React, {Component} from "react"
import ArticleList from "./news/NewsList";
import TaskList from "./task/TaskList";
import FriendList from "./friends/FriendList";

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            //put your components here
            <React.Fragment>
                <FriendList friends={this.props.friends} users={this.props.users} history={history} />
                <ArticleList {...this.props} />

            <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />

            </React.Fragment>
        )
    }
}