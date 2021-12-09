import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
import { dateFormat } from '../../../utils/constant';
import { bulkCreateScheduleService } from '../../../services/doctorService';



class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            // options: [],
            currentDate: '',
            timeSchedule: [],


        }
    }

    async componentDidMount() {
        await this.props.fetchAllDoctors();
        await this.props.fetchTimeSchedule();
    }

    componentDidUpdate(prevProps, prevState) {
        // if (prevProps.doctors !== this.props.doctors) {
        //     this.optionsSelectedDoctor(this.props.doctors);

        // }

        if (prevProps.doctors !== this.props.doctors) {
            this.props.doctors.filter((item) => {
                if (item.id === this.props.userInfo.id) {
                    this.setState({
                        selectedDoctor: { value: item.id, label: `${item.firstName} ${item.lastName}` }
                    })
                }
            })
        }
        if (prevProps.timeSchedule !== this.props.timeSchedule) {
            if (this.props.timeSchedule) {
                this.props.timeSchedule.map(time => {
                    time.isSelected = false;
                })
            }
            this.setState({
                timeSchedule: this.props.timeSchedule,
            })
        }
    }

    // optionsSelectedDoctor = (list) => {
    //     list.map((doctor) => {
    //         this.state.options.push({ value: doctor.id, label: `${doctor.lastName} ${doctor.firstName}` });
    //     })
    //     return list;
    // }

    // handleChange = async (selectedDoctor) => {
    //     this.setState({
    //         selectedDoctor: selectedDoctor
    //     })
    // }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }

    handleSelectBtnTime = (timeChosse) => {
        let { timeSchedule, currentDate } = this.state;
        if ((currentDate instanceof Date && !isNaN(currentDate)) === false) {
            alert('Please select a date');
            return;
        }

        // console.log(this.state.currentDate.setHours(9));
        if (timeSchedule && timeSchedule.length > 0) {
            timeSchedule.map((time) => {
                if (time.keyMap === timeChosse.keyMap) {
                    timeChosse.isSelected = !timeChosse.isSelected;
                    timeChosse.timeStampChoosed = currentDate.setHours(time.valueVi.slice(0, time.valueVi.indexOf(':')));
                }
            })
            this.setState({
                timeSchedule: timeSchedule
            })
        }

    }

    handleSaveScheduleDoctor = async () => {
        let { timeSchedule, currentDate, selectedDoctor } = this.state;
        let result = [];

        if ((currentDate instanceof Date && !isNaN(currentDate)) === false) {
            toast.error('Invalid date');
            return;
        }

        if (timeSchedule && timeSchedule.length > 0) {
            let selectedTime = timeSchedule.filter(time => time.isSelected === true)
            selectedTime.map(time => {
                let object = {};
                object.doctorId = selectedDoctor.value;
                object.timeType = time.keyMap;
                object.date = time.timeStampChoosed;
                result.push(object)
            })
        }


        let res = await bulkCreateScheduleService({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
        });

        if (res && res.errCode === 0) {
            toast.success('Create schedule successfully');
            this.state.timeSchedule.filter(time => time.isSelected = false);
            // this.setState({
            //     currentDate: '',
            // })
        } else {
            toast.error("Can't save schedule");
        }
    }



    render() {
        let { timeSchedule } = this.state;
        let language = this.props.language;
        let date = new Date();

        return (


            <div className="container container-schedule">
                <div className="content-schedule mt-5">
                    <div className="title-schedule">
                        <h1>
                            Quản lý lịch khám bệnh của Bác Sĩ
                        </h1>
                    </div>

                    <div className="row">


                        <div className="col-6 form-group">
                            <label htmlFor="">Choose a doctor</label>

                            <Select
                                // onChange={this.handleChange}
                                // options={options}
                                value={this.state.selectedDoctor}
                                placeholder="Doctor..."
                                isDisabled={true}
                            />

                        </div>


                        <div className="col-6 form-group">
                            <label htmlFor="">Choose a day</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={date.setDate(date.getDate() - 1)}
                            />
                        </div>

                        <div className="col-12 choose-hour mt-4">

                            {timeSchedule && timeSchedule.length > 0 &&
                                timeSchedule.map((time, i) => {
                                    let timeEn = time.valueEn;
                                    let timeVi = time.valueVi;
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => this.handleSelectBtnTime(time)}
                                            className={time.isSelected === true ? "btn btn-info btn-schedule" : "btn btn-secondary btn-schedule"}
                                        >{timeVi}
                                        </button>
                                    )
                                })
                            }

                        </div>


                    </div>
                </div>



                <button className="btn btn-primary mt-5" onClick={this.handleSaveScheduleDoctor}>Lưa thông tin</button>
            </div>




        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        doctors: state.admin.allDoctors,
        timeSchedule: state.admin.timeSchedule,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        fetchTimeSchedule: () => dispatch(actions.fetchTimeSchedule()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
