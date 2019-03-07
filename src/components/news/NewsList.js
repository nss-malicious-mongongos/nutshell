import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import './article.css'


export default class ArticleList extends Component {

    render() {
        const userId = parseInt(sessionStorage.getItem("credentials"))

        const friendarray = this.props.friends.map(friend => this.props.articles.filter(
            o => o.userId === friend.otherpersonId)) || []

        console.log(friendarray)
        const friendArticleArray = friendarray[0] || []


        return (
            <div>
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
                    this.props.articles.filter(article => article.userId === userId)
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
                <h1>My Friends News Articles</h1>
                <div className="friendArticles article-card card shadow bg-light">





                    {
                        friendArticleArray.map(article =>

                            <div>
                                <h3>{article.title}</h3>
                                <p>{article.synopsis}</p>
                                <a href={article.url}>{article.url}</a>
                                {
                                    this.props.friends.map(friend =>
                                        <div id={friend.id} className="card p-1">
                                            {
                                                this.props.users
                                                    .filter(user => user.id === friend.otherpersonId)
                                                    .map(u =>
                                                        <h5>
                                                            User Name: {u.username}
                                                        </h5>
                                                    )
                                            }
                                        </div>
                                    )
                                }



                            </div>
                        )

                    }


                </div>

            </div>
        )

    }
}