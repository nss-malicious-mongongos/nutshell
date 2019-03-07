
import Settings from "./Settings";

export default {
    get(id) {
        return fetch(`${Settings.remoteURL}/messages/${id}?_expand=user`).then(e => e.json());
    },
    delete(id) {
        return fetch(`${Settings.remoteURL}/messages/${id}`, {
            "method": "DELETE"
        }).then(e => e.json());
    },
    getAll() {
        return fetch(`${Settings.remoteURL}/messages?_expand=user`).then(e => e.json());
    },
    put(editedMessage) {
        return fetch(`${Settings.remoteURL}/messages/${editedMessage.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedMessage)
        }).then(data => data.json());
    },
    post(newMessage) {
        return fetch(`${Settings.remoteURL}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
        }).then(data => data.json())
    }
}