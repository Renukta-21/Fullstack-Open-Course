import axios from "axios";
const baseURL = `http://localhost:3000/notes`

const getAll = () => axios.get(baseURL)
const updateElement = (obj) => axios.put(`${baseURL}/${obj.id}`, obj)
const createElement = (obj) => axios.post(baseURL, obj)

export default {
    getAll: getAll,
    updateElement: updateElement,
    createElement:createElement
}