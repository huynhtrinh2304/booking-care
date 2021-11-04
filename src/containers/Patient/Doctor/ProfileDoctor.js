import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/doctorService'
import moment from 'moment';
import localization from 'moment/locale/vi';



class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfiles: {},
        }


    }

    async componentDidMount() {
        let inforDoctor = await this.getInforDoctor(this.props.id);
        this.setState({ dataProfiles: inforDoctor });

    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.error === 0) {
                result = res.inforDoctor;
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            // this.getInforDoctor(this.props.id)
        }

    }

    renderTimeBooking = (timeBooking, language) => {
        let date;
        let hour;
        if (timeBooking && timeBooking.date && timeBooking.timeTypeData) {
            date = language === LANGUAGES.VI ?
                moment.unix(+timeBooking.date / 1000).format('dddd  DD-MM-YYYY').charAt(0).toUpperCase()
                + moment.unix(+timeBooking.date / 1000).format('dddd  DD-MM-YYYY').slice(1)

                : moment.unix(+timeBooking.date / 1000).locale('en').format('ddd  MM-DD-YYYY')


            hour = language === LANGUAGES.VI ? timeBooking.timeTypeData.valueVi : timeBooking.timeTypeData.valueEn;
        }
        return (
            <p>Ngày đặt: {date} vào lúc: {hour}</p>
        )
    }

    renderPrice = (dataProfiles, language) => {
        let priceVi, priceEn;
        if (dataProfiles && dataProfiles.Doctor_Infor && dataProfiles.Doctor_Infor.priceData) {
            priceVi = dataProfiles.Doctor_Infor.priceData.valueVi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ';
            priceEn = dataProfiles.Doctor_Infor.priceData.valueEn + ' USD';
        }

        return (
            <p className="mt-4">
                Giá khám : {language === LANGUAGES.VI ? priceVi : priceEn}
            </p>
        )
    }

    renderNameDoctor = (dataProfiles, language) => {
        let inforEn, inforVi;
        if (dataProfiles && dataProfiles.positionData
            && dataProfiles.Doctor_Infor && dataProfiles.Doctor_Infor.priceData
        ) {
            inforEn = `${dataProfiles.positionData.valueEn}, ${dataProfiles.firstName} ${dataProfiles.lastName} `;
            inforVi = `${dataProfiles.positionData.valueVi}, ${dataProfiles.lastName} ${dataProfiles.firstName} `;
        }

        return (
            <h3>
                {language === 'vi' ? inforVi : inforEn}
            </h3>
        )
    }






    render() {
        let { dataProfiles } = this.state;
        let { language, doctorDetail } = this.props;

        return (
            <div className="intro-doctor-container">
                <div className="intro-doctor">
                    <div className="avatar-doctor" style={{ backgroundImage: `url(${dataProfiles && dataProfiles.image ? dataProfiles.image : ''})` }}>

                    </div>

                    <div className="content-doctor">
                        <div className="name-date">
                            {this.renderNameDoctor(dataProfiles, language)}

                            {this.renderTimeBooking(doctorDetail, language)}

                        </div>



                        <div className="content">
                            <p>
                                {
                                    dataProfiles && dataProfiles.Markdown && dataProfiles.Markdown.description &&
                                    <span dangerouslySetInnerHTML={{ __html: dataProfiles.Markdown.description }}></span>
                                }
                            </p>
                        </div>

                    </div>


                </div>

                {this.renderPrice(dataProfiles, language)}

            </div>



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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
