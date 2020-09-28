const baseURL = 'http://localhost:8000/'
const headers = new Headers({
    'Content-Type': 'application/json'
})

const request = {
    get: async (url, payload = {}) =>
        await fetch(
            new Request(`${baseURL}${url}`, {
                method: 'GET',
                headers
            })
        ).then(response => parseJSON(response)),
    post: async (url, payload = {}) =>
        await fetch(
            new Request(`${baseURL}${url}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload)
            })
        ).then(response => parseJSON(response)),
    delete: async (url, payload = {}) =>
        await fetch(
            new Request(`${baseURL}${url}`, {
                method: 'DELETE',
                headers,
                body: JSON.stringify(payload)
            })
        ).then(response => parseJSON(response))
}

function parseJSON(response) {
    return new Promise((resolve, reject) => {
        return response.text().then(text => {
            let json = text.length ? JSON.parse(text) : null
            if (response.ok) {
                resolve(json)
            } else {
                reject(json)
            }
        })
    })
}

function setToken(token) {
    headers.set('Authorization', `Token ${token}`)
}

function removeToken() {
    headers.delete('Authorization')
}

export { request, setToken, removeToken }
