import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions'
import DatePicker from '../../../components/Input/DatePicker';



class ManageSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: '',
            options: [],
            currentDate: '',
            timeSchedule: []

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchTimeSchedule();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            this.optionsSelectedDoctor(this.props.doctors);

        }

        if (prevProps.timeSchedule !== this.props.timeSchedule) {
            this.setState({
                timeSchedule: this.props.timeSchedule,
            })
        }
    }

    optionsSelectedDoctor = (list) => {

        list.map((doctor) => {
            this.state.options.push({ value: doctor.id, label: `${doctor.lastName} ${doctor.firstName}` });
        })

        return list;
    }

    handleChange = async (selectedDoctor) => {

        this.setState({
            selectedDoctor: selectedDoctor
        })


    }

    handleOnChangeDatePicker = (date) => {

        this.setState({
            currentDate: date[0]
        })
    }



    render() {
        let timeSchedule = this.state.timeSchedule;
        let language = this.props.language;

        return (


            <div className="container container-schedule">
                <div className="content-schedule mt-5">
                    <div className="title-schedule">
                        <h1>
                            Quảng lý lịch khám bệnh của Bác Sĩ
                        </h1>
                    </div>

                    <div className="row">


                        <div className="col-6 form-group">
                            <label htmlFor="">Choose a doctor</label>

                            <Select
                                onChange={this.handleChange}
                                options={this.state.options}
                            />

                        </div>


                        <div className="col-6 form-group">
                            <label htmlFor="">Choose a day</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                minDate={new Date()}
                            />
                        </div>

                        <div className="col-12 choose-hour">

                            {timeSchedule && timeSchedule.length > 0 &&
                                timeSchedule.map((time, i) => {
                                    let timeEn = time.valueEn;
                                    let timeVi = time.valueVi;


                                    return (

                                        <button key={i} className="btn btn-info btn-schedule">{timeVi}</button>

                                    )
                                })

                            }


                        </div>


                    </div>
                </div>



                <button className="btn btn-primary mt-5">Lưa thông tin</button>
            </div>




        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
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
