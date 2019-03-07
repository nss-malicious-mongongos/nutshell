import ArticleManager from "../modules/ArticleManager";
import Dashboard from "./Dashboard"
import EditArticleForm from "./news/EditArticleForm";
import EventForm from "./event/EventForm";
import EventManager from "../modules/EventManager";
import NewArticleForm from "./news/NewArticleForm";
import React, { Component } from "react"
import { Route } from "react-router-dom"
import TaskManager from "../modules/TaskManager";
import TaskEditForm from "./task/TaskEditForm"
import TaskForm from "./task/TaskForm"
import EventEditForm from "./event/EventEditForm";

export default class ApplicationViews extends Component {
  state = {
    articles: [],
    events: [],
    tasks: []
  }

  EditArticle = (editedArticleObject) => {
    return ArticleManager.EditArticle(editedArticleObject)
      .then(() => ArticleManager.getAll())
      .then(articles => this.setState({ articles: articles })
      )
  };

  addNewArticle = Article => {
    return ArticleManager.CreateNewArticle(Article)
      .then(() => ArticleManager.getAll())
      .then(articles =>
        this.setState({
          articles: articles
        })
      )
  }

  deleteArticle = id => {
    return ArticleManager.deleteArticle(id)
      .then(() => ArticleManager.getAll())
      .then(articles => this.setState({ articles: articles })
      )

  }

  addTask = task => {
    return TaskManager.addTask(task)
      .then(() => TaskManager.getUserQuery())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
  }

  updateTask = editedTask => {
    return TaskManager.edit(editedTask)
      .then(() => TaskManager.getUserQuery())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
  }
  deleteTask = id => {
    TaskManager.delete(id)
      .then(() => TaskManager.getUserQuery())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
  }

  refreshEvents = () => {
    const newState = {}
    EventManager.getAll()
      .then(events => {
        newState.events = events
        this.setState(newState)
      })
  }

  addEvent = (event) => {
    EventManager.addEvent(event)
      .then(() => EventManager.getAll())
      .then(events => this.setState({ events: events }))
  }

  deleteEvent = (id) => {
    EventManager.delete(id)
      .then(() => EventManager.getAll())
      .then(() => this.refreshEvents())
  }

  updateEvent = obj => {
    return EventManager.updateEvent(obj)
      .then(() => this.refreshEvents())
  }

  componentDidMount() {
    const newState = {};
    this.refreshEvents()

    ArticleManager.getAll()
      .then(articles => newState.articles = articles)
      .then(() => this.setState(newState))

    TaskManager.getUserQuery()
      .then(tasks => newState.tasks = tasks)
      .then(() => this.setState(newState))
  }

  render() {
    return <React.Fragment>
      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          articles={this.state.articles}
          deleteArticle={this.deleteArticle}
          addNewArticle={this.addNewArticle}
          editArticle={this.EditArticle}
          events={this.state.events}
          deleteEvent={this.deleteEvent}
          tasks={this.state.tasks}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}
        />
      }}
      />
      <Route path="/events/:eventId(\d+)/edit" render={(props) => {
        return <EventEditForm {...props} events={this.state.events} updateEvent={this.updateEvent} />
      }} />
      <Route exact path="/tasks/new" render={(props) => {
        return <TaskForm {...props} addTask={this.addTask} />
      }} />
      <Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
        return <TaskEditForm {...props} updateTask={this.updateTask} />
      }} />
      <Route path="/newEvent" render={props => {
        return <EventForm {...props} addEvent={this.addEvent} />
      }} />
      <Route exact path="/articles/new" render={props => {
        return <NewArticleForm {...props}
          articles={this.state.articles}
          addNewArticle={this.addNewArticle}
        />
      }}
      />
      <Route path="/articles/:articleId(\d+)/edit" render={props => {
        return <EditArticleForm {...props}
          editArticle={this.EditArticle}
          articles={this.state.articles}

        />
      }}
      />
    </React.Fragment>
  }
}