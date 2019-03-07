import React, { Component } from "react"
import ArticleManager from "../../modules/ArticleManager";



export default class EditArticleForm extends Component {
    // Set initial state
    state = {
        title: "",
        synopsis: "",
        url:"",
        userId: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingArticle = evt => {
      evt.preventDefault()

      if (this.state.location === "") {
        window.alert("Please select a location");
      } else {
        const editedArticle = {
          id: this.props.match.params.articleId,
          title: this.state.title,
          synopsis:this.state.synopsis,
          url: this.state.url,
          
          userId: parseInt(sessionStorage.getItem("credentials")),


        };

    this.props.editArticle(editedArticle)

    .then(() => this.props.history.push("/"))
    }
  }

    componentDidMount() {
      ArticleManager.get(this.props.match.params.articleId)
      .then(article => {
        this.setState({
          title: article.title,
          synopsis: article.synopsis,
          url: article.url


        });
      });
    }


    render() {
      return (
        <>
          <form className="articleForm">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="title"
                value = {this.state.title}
              />
            </div>

            <div className="form-group">
            <label htmlFor="synopsis">Synopsis</label>
            <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="synopsis"
                value = {this.state.synopsis}
              />
          </div>

          <div className="form-group">
            <label htmlFor="url">url</label>
            <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="url"
                value = {this.state.url}
              />
          </div>
            <button
              type="submit"
              onClick={this.updateExistingArticle}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </>
      );
    }
}