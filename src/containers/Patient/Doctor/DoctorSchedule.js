import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './DoctorSchedule.scss'
import localization from 'moment/locale/vi';
import moment from 'moment';
import { getScheduleDoctorByDateService } from '../../../services/userService';





class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDay: []

        }


    }

    async componentDidMount() {

        moment(new Date()).startOf('day').format('dddd - DD/MM');
        moment(new Date()).locale('en').format('ddd - DD/MM');

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
                object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
            } else {
                object.label = moment(new Date()).locale('en').add(i, 'days').format('dddd - DD/MM');
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

        let res = await getScheduleDoctorByDateService(doctorId, date);
        console.log(res);
    }


    render() {
        let { allDay } = this.state;

        return (
            <>
                <div className="container-schedule">

                    <div className="choose-date">
                        <select onChange={(e) => this.onChangeSelectChooseDate(e)}>
                            {allDay && allDay.length > 0 && allDay.map((item, index) => {
                                return (
                                    <option value={item.value} key={index}>{item.label}</option>
                                )
                            })}

                        </select>
                    </div>

                    <div className="choose-hour">

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
