import axios from "axios";

const baseURL = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseURL, newBlog, config);
  return response.data;
};

const addLike = (id, updatedBlog) => {
  return axios.put(`${baseURL}/${id}`, updatedBlog);
};

const deleteBlog = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  addLike: addLike,
  deleteBlog: deleteBlog,
  setToken: setToken,
};
