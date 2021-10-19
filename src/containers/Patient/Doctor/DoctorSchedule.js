import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './DoctorSchedule.scss'
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getScheduleDoctorByDateService } from '../../../services/userService';
import './Select.scss'




class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDay: [],
            scheduleOfDay: [],

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

    }

    setArrDays = () => {
        let allDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};

            if (this.props.language === LANGUAGES.VI) {
                let day = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = day.charAt(0).toUpperCase() + day.slice(1);

            } else {
                object.label = moment(new Date()).locale('en').add(i, 'days').format('ddd - DD/MM');
            }

            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDay.push(object);
        }
        this.setState({
            allDay: allDay
        })
    }


    onChangeSelectChooseDate = async (e) => {
        let date = e.target.value;
        let doctorId = this.props.id;
        this.callFunctionGetSchedule(doctorId, date);


    }


    callFunctionGetSchedule = async (doctorId, date) => {
        let res = await getScheduleDoctorByDateService(doctorId, date);
        if (res && res.errCode === 0) {
            this.setState({
                scheduleOfDay: res.data
            })
        }
    }


    render() {
        let { allDay, scheduleOfDay } = this.state;
        let { language } = this.props

        return (
            <>
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
                                <span><i className="fas fa-calendar-plus"> Lịch khám</i></span>
                            </div>

                            <div className="time-content">
                                {scheduleOfDay && scheduleOfDay.length > 0 ?
                                    scheduleOfDay.map((value, index) => {

                                        let timeValue = language === LANGUAGES.VI ? value.timeTypeData.valueVi : value.timeTypeData.valueEn;
                                        return (
                                            <button key={index}>{timeValue}</button>
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
