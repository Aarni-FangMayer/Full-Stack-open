import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const create = newObject => axios.post(baseURL, newObject).then(response => response.data)

const deletePerson = (id) => axios.delete(`${baseURL}/${id}`)

const update = (id, updatedPerson) => axios.put(`${baseURL}/${id}`, updatedPerson).then(response => response.data)


export default { getAll, create, deletePerson, update }