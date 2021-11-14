import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManagePaitent.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getListPaitentFortDoctorService } from '../../../services/doctorService'
import DoneConfirm from './ModalConfirmPatient/DoneConfirm'



class ManagePaitent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            listPatients: [],
            isOpenModel: false,
            inforPatientDoctor: {},

        }
    }

    async componentDidMount() {
        let today = this.state.currentDate.setHours(0, 0, 0, 0);
        let doctorId = this.props.userInfo.id;
        let listPatients = await getListPaitentFortDoctorService(doctorId, today);
        this.setState({ listPatients: listPatients.data })

    }

    async componentDidUpdate(prevProps, prevState) {

    }

    setAgainPatient = async () => {
        let today = this.state.currentDate.setHours(0, 0, 0, 0);
        let doctorId = this.props.userInfo.id;
        let listPatients = await getListPaitentFortDoctorService(doctorId, today);
        this.setState({ listPatients: listPatients.data });
    }

    handleOnChangeDatePicker = async (date) => {
        let listPatients = await getListPaitentFortDoctorService(this.props.userInfo.id, date[0].getTime());

        this.setState({
            currentDate: date[0],
            listPatients: listPatients.data
        })
    }

    handleBtnConfirm = (inforpatient) => {
        let data = {
            doctorId: inforpatient.doctorId,
            patientId: inforpatient.patient.id,
            emailPatient: inforpatient.patient.email,
            fullName: inforpatient.fullName,
            date: inforpatient.date,
            timeType: inforpatient.timeType,
            statusId: inforpatient.statusId
        }

        this.setState({
            isOpenModel: true,
            inforPatientDoctor: data
        })
    }

    toggleParent = () => {
        this.setState({
            isOpenModel: !this.state.isOpenModel
        })
    }





    render() {
        let { listPatients } = this.state


        return (
            <div className="container-manage-paitent">
                <div className="title-container text-center mt-4">
                    <h2>Manage Paitent</h2>
                </div>

                <div className="manage-paitent-body row">
                    <div className="col-6 form-group">
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            className="form-control"
                            value={this.state.currentDate}

                        />
                    </div>


                    <div className="col-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name patient</th>
                                    <th scope="col">Appointment time</th>
                                    <th scope="col">Phone number</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Reason</th>
                                    <th scope="col">Address</th>
                                    <th scope="col" className="text-center">Confirm</th>


                                </tr>
                            </thead>

                            <tbody>

                                {
                                    listPatients && listPatients.length > 0 &&
                                    listPatients.map((item, index) => {
                                        if (item && item.gender === 'M') {
                                            item.gender = 'Nam'
                                        }

                                        else if (item && item.gender === 'F') {
                                            item.gender = 'Nữ'
                                        }
                                        else if (item && item.gender === 'O') {
                                            item.gender = 'Khác'
                                        }


                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.fullName}</td>
                                                <td>{item.time.valueVi}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.gender}</td>
                                                <td>{item.reason}</td>
                                                <td>{item.address}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-success"
                                                        onClick={() => this.handleBtnConfirm(item)}
                                                    >Done
                                                    </button>
                                                </td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>

                        {
                            listPatients.length === 0 && <p className="text-center">Hiện tại chưa có lịch khám</p>
                        }
                    </div>
                </div>

                <DoneConfirm
                    isOpen={this.state.isOpenModel}
                    toggleParent={this.toggleParent}
                    data={this.state.inforPatientDoctor}
                    setAgainPatient={this.setAgainPatient}
                />

            </div>
        )
    }

}








const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo,
    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePaitent);
