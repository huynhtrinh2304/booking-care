import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import './DoctorSchedule.scss'
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getScheduleDoctorByDateService } from '../../../services/userService';
import './Select.scss'
import BookingModal from './Modal/BookingModal'



class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            scheduleOfDay: [],
            isOpenModelBooking: false,
            inforDoctor: '',
            selectedDay: ''

        }


    }

    async componentDidMount() {
        let date = moment(new Date()).add(0, 'days').startOf('day').valueOf();
        let doctorId = this.props.id;
        this.callFunctionGetSchedule(doctorId, date);
        this.setArrDays();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setArrDays();
        }

        if (this.props.id !== prevProps.id) {
            let doctorId = this.props.id;
            this.callFunctionGetSchedule(doctorId, this.state.selectedDay);

        }

    }

    callFunctionGetSchedule = async (doctorId, date) => {
        let res = await getScheduleDoctorByDateService(doctorId, date);
        if (res && res.errCode === 0) {
            this.setState({
                scheduleOfDay: res.data
            })
        }
    }

    onChangeSelectChooseDate = async (e) => {
        let date = e.target.value;
        let doctorId = this.props.id;
        this.callFunctionGetSchedule(doctorId, date);
        this.setState({
            selectedDay: date
        })

    }

    setArrDays = () => {
        let allDay = [];
        let today = new Date().setHours(0, 0, 0, 0);
        for (let i = 0; i < 7; i++) {
            let object = {};
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

            if (this.props.language === LANGUAGES.VI) {
                let day = moment(new Date()).add(i, 'days').format('dddd - DD/MM');

                object.label = day.charAt(0).toUpperCase() + day.slice(1);

                if (object.value === today) {
                    let label = object.label.slice(object.label.indexOf(' ', 6))
                    object.label = 'Hôm nay' + label;
                }

            } else {
                object.label = moment(new Date()).locale('en').add(i, 'days').format('ddd - DD/MM');
                if (object.value === today) {
                    let label = object.label.slice(object.label.indexOf(' ', 3))
                    object.label = 'Today' + label;
                }
            }
            allDay.push(object);
        }
        this.setState({
            allDay: allDay
        })
    }



    openModelBookingSchedule = (value) => {
        this.setState({
            isOpenModelBooking: true,
            inforDoctor: value
        })
    }


    setIsOpenModalBooking = () => {
        this.setState({
            isOpenModelBooking: !this.state.isOpenModelBooking,
            inforDoctor: ''
        })
    }


    render() {
        let { allDay, scheduleOfDay } = this.state;
        let { language } = this.props;



        return (
            <>

                <BookingModal
                    isOpen={this.state.isOpenModelBooking}
                    toggleModalBooking={this.setIsOpenModalBooking}
                    doctorDetail={this.state.inforDoctor}
                />
                <div className="container-schedule">

                    <div className="choose-date ">

                        <select id="header-container" onChange={(e) => this.onChangeSelectChooseDate(e)}>
                            {allDay && allDay.length > 0 && allDay.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="detail-calendar">
                        <div className="choose-hour">

                            <div className="text-calendar">
                                <span>
                                    <i className="fas fa-calendar-plus">  <FormattedMessage id="patient.detail-doctor.schedule" /> 👻</i>
                                </span>
                            </div>

                            <div className="time-content">
                                {scheduleOfDay && scheduleOfDay.length > 0 ?
                                    scheduleOfDay.map((value, index) => {

                                        let timeValue = language === LANGUAGES.VI ? value.timeTypeData.valueVi : value.timeTypeData.valueEn;
                                        return (
                                            <button key={index} onClick={() => this.openModelBookingSchedule(value)}>{timeValue}</button>
                                        )
                                    }) :

                                    <h3 className="mt-4" style={{ color: 'red' }}>Doctor's schedule is currently not available. Please you should choose other day</h3>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}






const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
