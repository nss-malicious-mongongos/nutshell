import Settings from "./Settings"

export default {
    get(id) {
        return fetch(`${Settings.remoteURL}/tasks/${id}`).then(e => e.json())
    },
    delete(id) {
        return fetch(`${Settings.remoteURL}/tasks/${id}`, {
            method: "DELETE"
        }).then(e => e.json())
    },
    getAll() {
        return fetch(`${Settings.remoteURL}/tasks`).then(e => e.json())
    },
    addTask(obj) {
        return fetch(`${Settings.remoteURL}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    edit(obj) {
        return fetch(`${Settings.remoteURL}/tasks/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application.json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    searchUsername(id) {
        return fetch(`${Settings.remoteURL}/tasks?userId=${id}`)
        .then(e => e.json())
    },
    getQuery(query) {
        return fetch(`${Settings.remoteURL}/tasks${query}`).then(e => e.json())
    }
}