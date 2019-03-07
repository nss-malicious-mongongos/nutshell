import Settings from "./Settings"

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/events/${id}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/events/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getAll() {
    const activeUser = parseInt(sessionStorage.getItem("credentials"))
    return fetch(`${Settings.remoteURL}/events?userId=${activeUser}&_sort=date&_order=asc`).then(e => e.json())
  },
  addEvent(obj) {
    return fetch(`${Settings.remoteURL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  updateEvent(obj) {
    return fetch(`${Settings.remoteURL}/events/${obj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(r => r.json())
  }
}
