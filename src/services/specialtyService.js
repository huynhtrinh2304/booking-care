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
const getAllDoctorBySpecialtyIdService = (id) => {
    return axios.get(`/api/get-all-doctor-by-specialty-id?id=${id}`)
}



export {
    postCreateNewSpecialtyService,
    getAllSpecialtyService,
    getAllNameSpecialtyService,
    getAllDoctorBySpecialtyIdService

}