import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { LANGUAGES, CommonUtils } from '../../../../utils';
import * as actions from '../../../../store/actions';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/patientService'
import { toast } from 'react-toastify';
import Loading from '../../../../components/Loading/Loading';



class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            selectedGender: '',
            optionsGenders: [],
            email: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            reason: '',
            date: '',
            doctorId: '',
            timeType: '',
            isLoading: false,

        }
    }

    componentDidMount() {
        this.props.getGenderStart();
    }

    componentDidUpdate(prevProps, prevState) {
        let { genders, language } = this.props;
        if (prevProps.genders !== genders) {
            this.setState({
                optionsGenders: this.loopArrayGenders(genders, language)
            })
        }

        if (this.props.language !== prevProps.language) {
            this.setState({
                optionsGenders: this.loopArrayGenders(genders, language)
            })
        }

        if (this.props.doctorDetail !== prevProps.doctorDetail) {
            this.setState({
                doctorId: this.props.doctorDetail.doctorId,
                timeType: this.props.doctorDetail.timeType,
                date: this.props.doctorDetail.date,
            })
        }

    }

    loopArrayGenders = (arr, language) => {
        let arrGender = [];
        if (arr && arr.length > 0) {
            arr.map(item => {
                arrGender.push({ value: item.keyMap, label: language === LANGUAGES.VI ? item.valueVi : item.valueEn })
            })
        }
        return arrGender;
    }

    handleAcceptBooking = async () => {
        this.setState({
            isLoading: true
        })
        let { email, fullName, phoneNumber, address, reason, doctorId, timeType, selectedGender, date } = this.state;

        let data = {
            email: email,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            reason: reason,
            doctorId: doctorId,
            timeType: timeType,
            gender: selectedGender.value,
            date: date,
            language: this.props.language
        }


        let res = await postPatientBookAppointment(data);

        if (res && res.errCode === 0) {
            this.setState({
                isLoading: false,
            })
            toast.success('Successful appointment booking')
            this.toggle();
        } else {
            this.setState({
                isLoading: false,
            })
            toast.error(res.message)
        }
    }


    toggle = () => {
        this.props.toggleModalBooking();
    };


    handleChangeGender = (value) => {
        this.setState({
            selectedGender: value
        })
    }

    handleOnChangeInput = (e, name) => {
        let valueInput = e.target.value;
        let copyState = { ...this.state };
        copyState[name] = valueInput;
        this.setState({ ...copyState });
    }






    render() {
        let { language, doctorDetail } = this.props;
        let { optionsGenders, selectedGender, isLoading } = this.state


        return (
            <>
                {
                    this.state.isLoading &&
                    <div className="block-cover" style={{ display: isLoading ? 'block' : 'none' }}>
                        <Loading />
                    </div>
                }



                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size='lg'
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        <ProfileDoctor
                            id={doctorDetail.doctorId}
                            doctorDetail={doctorDetail}
                            hiddenTime={false}
                            hiddenPrice={false}

                        />
                    </ModalHeader>

                    <ModalBody>

                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <label>Họ tên</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.fullName}
                                    onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}

                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Địa chỉ Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                />

                            </div>

                            <div className="form-group col-md-6">
                                <label>Địa chỉ liên hệ</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.address}
                                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                />

                            </div>



                            <div className="form-group col-md-6">
                                <label>Giới tính</label>
                                <Select
                                    onChange={this.handleChangeGender}
                                    options={optionsGenders}
                                    placeholder="Gender"
                                    value={selectedGender}
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Lý do khám</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.reason}
                                    onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleAcceptBooking}>Xác nhận</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </>

        )
    }






}






const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
