import React, { Component } from "react"
import ChatList from "./chat/ChatList"
import TaskList from "./task/TaskList";

export default class Dashboard extends Component {
    render() {
        const history = this.props.history;
        return (
            <React.Fragment>
                //put your components here
                <ChatList messages={this.props.messages}
                    deleteMessage={this.props.deleteMessage}
                    {...this.props}
                />
                <TaskList tasks={this.props.tasks} history={history} updateTask={this.props.updateTask} deleteTask={this.props.deleteTask} />
            </React.Fragment>
        )
    }
}