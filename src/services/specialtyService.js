import axios from '../axios'


const postCreateNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialtyService = () => {
    return axios.get(`/api/get-all-specialty`)
}
const getAllNameSpecialtyService = () => {
    return axios.get(`/api/get-all-name-specialty`)
}



export {
    postCreateNewSpecialtyService,
    getAllSpecialtyService,
    getAllNameSpecialtyService

}