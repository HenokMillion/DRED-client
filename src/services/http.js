import axios from 'axios'

export const post = async (url, data, headers={}) => {
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
}

export const put = (url, data, headers={}) => {
    return axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            ...headers
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
