import React, { Component } from 'react';
import { connect } from 'react-redux';
import VerifyFailed from '../../components/VerifyPatient/VerifyFailed';
import VerifySucced from '../../components/VerifyPatient/VerifySucced';
import { postVerifyBookAppointment } from '../../services/patientService'







class VerifyBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            verify: '',
        }
    }

    async componentDidMount() {
        let query = this.getQueryParams();

        let res = await postVerifyBookAppointment({
            token: query.token,
            doctorId: query.doctorId,
            patientId: query.patientId,
            timeType: query.timeType,
            date: query.date
        })
        if (res.errCode === 0) {
            this.setState({
                verify: true
            })
        } else {
            this.setState({
                verify: false
            })
        }
    }

    getQueryParams = () => {
        let query = new URLSearchParams(this.props.location.search);
        let token = query.get('token');
        let doctorId = query.get('doctorId');
        let patientId = query.get('patientId');
        let timeType = query.get('timeType');
        let date = query.get('date');


        return {
            token: token,
            doctorId: doctorId,
            patientId: patientId,
            timeType: timeType,
            date:date
        }

    }


    async componentDidUpdate(prevProps, prevState) {
    }


    render() {

        return (
            <>
                {this.state.verify === true ? <VerifySucced /> : <VerifyFailed />}
            </>
        )
    }
}






const mapStateToProps = state => {
    return {

    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
