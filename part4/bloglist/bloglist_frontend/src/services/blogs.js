import axios from "axios";

const baseURL = "/api/blogs"

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newBlog => {
    return axios.post(baseURL, newBlog)
}

const addLike = (id, updatedBlog) => {
    return axios.put(`${baseURL}/${id}`, updatedBlog)
}

export default {
    getAll: getAll,
    create: create,
    addLike: addLike
}