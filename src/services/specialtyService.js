import axios from '../axios'


const postCreateNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}
const getAllSpecialtyService = (data) => {
    return axios.get(`/api/get-all-specialty`)
}



export {
    postCreateNewSpecialtyService,
    getAllSpecialtyService

}