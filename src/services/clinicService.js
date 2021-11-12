import axios from '../axios';


const postCreateNewClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}

const getAllClinicService = () => {
    return axios.get(`/api/get-all-clinic`);
}
const getAllNameClinicService = () => {
    return axios.get(`/api/get-all-name-clinic`);
}
const getAllDoctorByClinicIdService = (id) => {
    return axios.get(`/api/get-all-doctor-by-clinic-id?id=${id}`);
}

export {
    postCreateNewClinicService,
    getAllClinicService,
    getAllNameClinicService,
    getAllDoctorByClinicIdService

}