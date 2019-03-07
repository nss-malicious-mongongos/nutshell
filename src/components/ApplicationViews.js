import React, { Component } from "react"
import { Route } from "react-router-dom"
import ArticleManager from "../modules/ArticleManager";
import ChatEditForm from "../components/chat/ChatEditForm"
// import ChatForm from "../components/chat/ChatForm"
import ChatList from "../components/chat/ChatList"
import ChatManager from "../modules/ChatManager"
import Dashboard from "./Dashboard"
import MovieManager from "../modules/MovieManager"
import MovieForm from "./Movies/MovieForm"
import MovieList from "./Movies/MovieList"
import MovieFullList from "./Movies/MovieFullList"
import MovieEditForm from "./Movies/MovieEditForm";
import NewArticleForm from "./news/NewArticleForm";
import EditArticleForm from "./news/EditArticleForm";
import TaskEditForm from "./task/TaskEditForm"
import TaskForm from "./task/TaskForm"
import TaskManager from "../modules/TaskManager";

class ApplicationViews extends Component {
  state = {
    messages: [],
    tasks: [],
    articles: [],
    users: [],
    movies: []
  }

  createMessage = message => {
    return ChatManager.post(message)
      .then(() => ChatManager.getAll())
      .then(messages =>
        this.setState({
          messages: messages
        })
      )
  }
  deleteMessage = (id) =>
    ChatManager.delete(id)
      .then(ChatManager.getAll)
      .then(messages => this.setState({ messages: messages }))

  updateMessage = editedMessage => {
    return ChatManager.put(editedMessage)
      .then(() => ChatManager.getAll())
      .then(messages =>
        this.setState({
          messages: messages
        })
      )
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

  updateMovie = editedMovie => {
    return MovieManager.updateMovie(editedMovie)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
  }

  deleteMovie = id => {
    return MovieManager.deleteMovie(id)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
  }

  addMovie = movie => {
    return MovieManager.addMovie(movie)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
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

  componentDidMount() {
    const newState = {}

    ArticleManager.getAll()
      .then(articles => newState.articles = articles)

    ChatManager.getAll()
      .then(messages => newState.messages = messages)
      .then(() => this.setState(newState))
      .then(() => this.setState(newState))

    MovieManager.getAll()
      .then(movies => newState.movies = movies)

    TaskManager.getUserQuery()
      .then(tasks => newState.tasks = tasks)
      .then(() => this.setState(newState))
  }

  render() {

    console.log(this.props.activeUser)
    return <React.Fragment>

      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          articles={this.state.articles}
          deleteArticle={this.deleteArticle}
          addNewArticle={this.addNewArticle}
          editArticle={this.EditArticle}
          messages={this.state.messages}
          createMessage={this.createMessage}
          deleteMessage={this.deleteMessage}
          movies={this.state.movies}
          deleteMovie={this.deleteMovie}
          tasks={this.state.tasks}
          updateTask={this.updateTask}
          deleteTask={this.deleteTask}
        />
      }}
      />

      <Route exact path="/Movies" render={props => {
        return <MovieFullList {...props}
          movies={this.state.movies}
          deleteMovie={this.deleteMovie}
        />
      }}
      />
      <Route path="/Movies/:movieId(\d+)/edit" render={props => {
        return <MovieEditForm {...props}
          movies={this.state.movies}
          updateMovie={this.updateMovie}
        />
      }}
      />

      <Route exact path="/articles/new" render={props => {
        return <NewArticleForm {...props}
          articles={this.state.articles}
          addNewArticle={this.addNewArticle}
        />
      }}
      />

      <Route exact path="/Movies/New" render={props => {
        return <MovieForm {...props}
          addMovie={this.addMovie}
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
      <Route
        path="/messages/:messageId(\d+)/edit" render={props => {
          return <ChatEditForm {...props}
            messages={this.state.messages}
            updateMessage={this.updateMessage} />
        }}
      />
      <Route exact path="/messages/new" render={props => {
        return <ChatList {...props}
          messages={this.state.messages}
          createMessage={this.createMessage} />
      }}
      />
      <Route exact path="/tasks/new" render={(props) => {
        return <TaskForm {...props}
          addTask={this.addTask} />
      }} />

      <Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
        return <TaskEditForm {...props}
          updateTask={this.updateTask} />
      }} />

      <Route exact path="/tasks/new" render={(props) => {
        return <TaskForm {...props} addTask={this.addTask} />
      }} />

      <Route exact path="/tasks/:taskId(\d+)/edit" render={(props) => {
        return <TaskEditForm {...props} updateTask={this.updateTask} />
      }} />
    </React.Fragment >
  }
}
export default ApplicationViews







