import Settings from "./Settings"

export default {

    get(id) {
        return fetch(`${Settings.remoteURL}/articles/${id}`).then(e => e.json())
      },
      deleteArticle(id) {
        return fetch(`${Settings.remoteURL}/articles/${id}`, {
          method: "DELETE"
        }).then(e => e.json())
      },
      getAll() {
        return fetch(`${Settings.remoteURL}/articles?_sort=timestamp&_order=desc`).then(e => e.json())
      },
      CreateNewArticle(obj) {
        return fetch(`${Settings.remoteURL}/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(obj)
        }).then(data => data.json())
      },
      EditArticle(editedArticle) {
        return fetch(`${Settings.remoteURL}/articles/${editedArticle.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedArticle)
        }).then(data => data.json());
      }









}