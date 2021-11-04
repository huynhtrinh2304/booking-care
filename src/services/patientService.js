import axios from '../axios';


let postPatientBookAppointment = (data) => {
    return axios.post('/api/patient-book-appointment', data)
}

let postVerifyBookAppointment = (data) => {
    return axios.post('/api/verify-book-appointment', data)
}

export {
    postPatientBookAppointment,
    postVerifyBookAppointment
}

