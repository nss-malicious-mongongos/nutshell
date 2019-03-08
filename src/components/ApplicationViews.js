import React, { Component } from "react"
import { Route } from "react-router-dom"
import ArticleManager from "../modules/ArticleManager";
import ChatEditForm from "../components/chat/ChatEditForm"
// import ChatForm from "../components/chat/ChatForm"
import ChatList from "../components/chat/ChatList"
import ChatManager from "../modules/ChatManager"
import Dashboard from "./Dashboard"
import EditArticleForm from "./news/EditArticleForm";
import EventEditForm from "./event/EventEditForm";
import EventForm from "./event/EventForm";
import EventManager from "../modules/EventManager";
import MovieEditForm from "./Movies/MovieEditForm";
import MovieForm from "./Movies/MovieForm"
import MovieFullList from "./Movies/MovieFullList"
import MovieManager from "../modules/MovieManager"
import NewArticleForm from "./news/NewArticleForm";
import TaskEditForm from "./task/TaskEditForm"
import TaskForm from "./task/TaskForm"
import TaskManager from "../modules/TaskManager";
import UserManager from "../modules/UserManager";
import FriendManager from "../modules/FriendManager";
import NewFriend from "./friends/NewFriend";

export default class ApplicationViews extends Component {
  state = {
    articles: [],
    events: [],
    friends: [],
    messages: [],
    movies: [],
    tasks: [],
    users: [],
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


  addEvent = (event) => {
    EventManager.addEvent(event)
      .then(() => EventManager.getAll())
      .then(events => this.setState({ events: events }))
  }

  addMovie = movie => {
    return MovieManager.addMovie(movie)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
  }

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
      .then(articles => this.setState({ articles: articles })
      )

  }

  updateMovie = editedMovie => {
    return MovieManager.updateMovie(editedMovie)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
  }

  deleteEvent = (id) => {
    EventManager.delete(id)
      .then(() => EventManager.getAll())
      .then(() => this.refreshEvents())
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

  deleteTask = id => {
    TaskManager.delete(id)
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
  }

  EditArticle = (editedArticleObject) => {
    return ArticleManager.EditArticle(editedArticleObject)
      .then(() => ArticleManager.getAll())
      .then(articles => this.setState({ articles: articles })
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

  updateEvent = obj => {
    return EventManager.updateEvent(obj)
      .then(() => this.refreshEvents())
  }

  updateMovie = editedMovie => {
    return MovieManager.updateMovie(editedMovie)
      .then(() => MovieManager.getAll())
      .then(movies => this.setState({ movies: movies }))
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
  addFriend = friend => {
    return FriendManager.addFriend(friend)
      .then(() => FriendManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=user`))
      .then(friends =>
        this.setState({
          friends: friends
        })
      )
  }
  deleteFriend = id => {
    console.log(id)
    return FriendManager.delete(id)
      .then(() => FriendManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=user`))
      .then(friends =>
        this.setState({
          friends: friends
        })
      )
  }

  componentDidMount() {
    const newState = {};
    this.refreshEvents()

    ArticleManager.getAll()
      .then(articles => newState.articles = articles)

    ChatManager.getAll()
      .then(messages => newState.messages = messages)

    MovieManager.getAll()
      .then(movies => newState.movies = movies)

    UserManager.getAll()
      .then(users => newState.users = users)
      .then(() => FriendManager.getQuery(`?userId=${parseInt(sessionStorage.getItem("credentials"))}&_expand=user`))
      .then(friends => newState.friends = friends)

      .then(() => TaskManager.getUserQuery())
      .then(tasks =>
        this.setState({
          tasks: tasks
        })
      )
      .then(() => this.setState(newState))
  }

  render() {
    return <React.Fragment>
      <Route exact path="/" render={props => {
        return <Dashboard {...props}
          addNewArticle={this.addNewArticle}
          articles={this.state.articles}
          deleteArticle={this.deleteArticle}
          deleteEvent={this.deleteEvent}
          deleteMovie={this.deleteMovie}
          deleteTask={this.deleteTask}
          editArticle={this.EditArticle}
          events={this.state.events}
          friends={this.state.friends}
          messages={this.state.messages}
          createMessage={this.createMessage}
          deleteMessage={this.deleteMessage}
          movies={this.state.movies}
          tasks={this.state.tasks}
          updateTask={this.updateTask}
          users={this.state.users}
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















