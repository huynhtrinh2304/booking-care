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





export {
    getAllDoctorsService,
    postInforDoctorService,
    getDetailDoctorService,
    putUpdateDetailDoctor,
    bulkCreateScheduleService,
    getInforDoctorService
}