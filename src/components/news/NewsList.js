import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import './article.css'


export default class ArticleList extends Component {

    render() {
        const userId = parseInt(sessionStorage.getItem("credentials"))
        return (
            <div className="overflow-auto" id="articles-module">
                <h1 className="ArticleHeader ">My Articles </h1>
                <button type="button"
                    className="btn btn-dark"
                    onClick={() => {
                        this.props.history.push("/articles/new")
                    }
                    }>
                    Add News Article
           </button>
                {
                    this.props.articles.filter(article => article.userId === userId|article.userId === this.props.friends[2].otherPersonId)
                        .map(article =>
                            <section className="articleContainer ">
                                <div key={article.id} className="article-card card shadow bg-light" >
                                    <h2>{article.title}</h2>
                                    <p>{article.synopsis}</p>
                                    <a href={article.url}>{article.url}</a>

                                </div>
                                <button className="btn btn-danger" onClick={() => { this.props.deleteArticle(article.id) }}>Delete Article </button>

                                <button
                                    type="button"
                                    className="editArticleButton btn btn-info btn-fill"
                                    onClick={() => {
                                        this.props.history.push(`/articles/${article.id}/edit`);
                                    }}
                                >
                                    Edit Article
                            </button>
                            </section>
                        )

                }
            </div>
        )

    }
}