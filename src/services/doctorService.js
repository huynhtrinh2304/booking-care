import axios from '../axios'


const getAllDoctorsService = () => {
    return axios.get(`/api/get-all-doctors`)

}

const postInforDoctorService = (inforDoctor) => {
    return axios.post(`/api/save-infor-doctors`, inforDoctor)

}

export {
    getAllDoctorsService,
    postInforDoctorService
}