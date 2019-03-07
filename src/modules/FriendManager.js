import Settings from "./Settings"

export default {
    get(id) {
        return fetch(`${Settings.remoteURL}/friends/${id}`).then(e => e.json())
    },
    delete(id) {
        return fetch(`${Settings.remoteURL}/friends/${id}`, {
            method: "DELETE"
        }).then(e => e.json())
    },
    getAll() {
        return fetch(`${Settings.remoteURL}/friends`).then(e => e.json())
    },
    addFriend(obj) {
        return fetch(`${Settings.remoteURL}/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    edit(obj) {
        return fetch(`${Settings.remoteURL}/friends/${obj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(data => data.json())
    },
    searchUsername(id) {
        return fetch(`${Settings.remoteURL}/friends?userId=${id}`)
        .then(e => e.json())
    },
    getQuery(query) {
        return fetch(`${Settings.remoteURL}/friends${query}`).then(e => e.json())
    }
}