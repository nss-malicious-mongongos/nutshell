import React, { Component } from "react"
import 'bootstrap/dist/css/bootstrap.css'
import './article.css'


export default class ArticleList extends Component {

    render() {
        const userId = parseInt(sessionStorage.getItem("credentials"))




        const friendArticles = this.props.friends.filter(friend=> friend.userId === userId)
        const something = friendArticles.map(friend => this.props.articles.filter(
            o => o.userId === friend.otherpersonId
        )
        )

console.log(something)





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
                            <div  className="friendArticles article-card card shadow bg-light">

                                { something.map(el =>

                                    <div> {el.title}</div>
                                )

                                }

                            </div>

            </div>
        )

    }
}