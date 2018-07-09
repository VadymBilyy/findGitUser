import axios from 'axios'

export default (username) =>
    axios({
        method: 'get',
        url: `https://api.github.com/users/${username}`,
        responseType: 'stream',
        headers: {
            'Content-Type': 'application/json'
        }
    })
