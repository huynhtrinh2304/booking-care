import axios from '../axios'


const postCreateNewClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}


export {
    postCreateNewClinicService,


}