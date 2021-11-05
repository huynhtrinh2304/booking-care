import axios from '../axios'


const postCreateNewSpecialtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

export {
    postCreateNewSpecialtyService
}