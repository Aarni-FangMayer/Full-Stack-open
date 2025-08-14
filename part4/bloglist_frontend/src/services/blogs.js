import axios from "axios";

const baseURL = "http://localhost:3001/blogs"

const getAll = () => {
    return axios.get(baseURL)
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