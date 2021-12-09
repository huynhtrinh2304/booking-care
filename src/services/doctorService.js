import axios from '../axios'


const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)
}

const postInforDoctorService = (inforDoctor) => {
    return axios.post(`/api/save-infor-doctors`, inforDoctor)
}

const getDetailDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor?id=${id}`)
}

const getInforDoctorService = (id) => {
    return axios.get(`/api/get-infor-doctor?id=${id}`)
}

const putUpdateDetailDoctor = (data) => {
    return axios.put(`/api/edit-markdown-doctor`, data)
}

const bulkCreateScheduleService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getProfileDoctorById = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?id=${id}`)
}

const getListPaitentFortDoctorService = (id, time, futureTime) => {
    return axios.get(`/api/get-list-paitent-for-doctor?id=${id}&time=${time}&futureTime=${futureTime}`)
}

const sendMailForPatientService = (data) => {
    return axios.post(`/api/send-mail-for-patient`, data)
}


export {
    getAllDoctorsService,
    postInforDoctorService,
    getDetailDoctorService,
    putUpdateDetailDoctor,
    bulkCreateScheduleService,
    getInforDoctorService,
    getProfileDoctorById,
    getListPaitentFortDoctorService,
    sendMailForPatientService

}