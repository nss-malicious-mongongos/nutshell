import Settings from "./Settings";

export default {
    get(id) {
        return fetch(`${Settings.remoteURL}/movies/${id}`).then(e => e.json());
    },
    deleteMovie(id) {
        return fetch(`${Settings.remoteURL}/movies/${id}`, {
            "method": "DELETE"
        }).then(e => e.json());
    },
    getAll() {
      const activeUser = parseInt(sessionStorage.getItem("credentials"))
      return fetch(`${Settings.remoteURL}/movies?userId=${activeUser}&_sort=date&_order=asc`).then(e => e.json())
    },
    addMovie(newMovie) {
        return fetch(`${Settings.remoteURL}/movies`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newMovie)
        }).then(data => data.json())
    },
    updateMovie(editedMovie) {
        return fetch(`${Settings.remoteURL}/movies/${editedMovie.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(editedMovie)
        }).then(data => data.json());
    }
};
