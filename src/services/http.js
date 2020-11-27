import axios from 'axios'

export const post = async (url, data) => {
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const put = (url, data) => {
    return axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
}

export const get = (url, headers={}) => {
    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
}

export const multipartPost = async (url, data) => {
    const formData = new FormData()
    formData.append('image', data.image)
    formData.append('doctorId', data.doctorId)
    formData.append('patientId', data.patientId)
    return axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
