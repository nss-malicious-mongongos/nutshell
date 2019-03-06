import React, { Component } from "react"
import { Route } from "react-router-dom"
import Dashboard from "./Dashboard";
import ArticleManager from "../modules/ArticleManager";


class ApplicationViews extends Component {
  state = {
    articles: []
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
    return ArticleManager.removeAndlist(id)
      .then(() => ArticleManager.getAll())
      .then(articles => this.setState({ articles: articles })
      )

  }


  componentDidMount() {
    const newState = {}

    ArticleManager.getAll()
      .then(articles => newState.articles = articles)
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

        />
      }}
      />


    </React.Fragment>
  }
}

export default ApplicationViews
