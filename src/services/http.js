import axios from 'axios'

export const post = async (url, data) => {
    return axios.post(url, data, {})
}