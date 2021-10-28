import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/doctorService'




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



    render() {
        let inforEn, inforVi;
        let priceVi, priceEn;
        let dateBooking = '';
        let hourVi = '';
        let hourEn = '';
        let { dataProfiles, } = this.state;
        let { language, doctorDetail } = this.props;
        if (dataProfiles && dataProfiles.positionData
            && dataProfiles.Doctor_Infor && dataProfiles.Doctor_Infor.priceData
        ) {
            inforEn = `${dataProfiles.positionData.valueEn}, ${dataProfiles.firstName} ${dataProfiles.lastName} `;
            inforVi = `${dataProfiles.positionData.valueVi}, ${dataProfiles.lastName} ${dataProfiles.firstName} `;

            priceVi = dataProfiles.Doctor_Infor.priceData.valueVi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ';
            priceEn = dataProfiles.Doctor_Infor.priceData.valueEn + ' USD';
        }
        if (doctorDetail && doctorDetail.date && doctorDetail.timeTypeData) {
            let date = new Date(doctorDetail.date);
            dateBooking = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            hourVi = doctorDetail.timeTypeData.valueVi;
            hourEn = doctorDetail.timeTypeData.valueEn;
        }



        return (
            <div className="intro-doctor-container">
                <div className="intro-doctor">
                    <div className="avatar-doctor" style={{ backgroundImage: `url(${dataProfiles && dataProfiles.image ? dataProfiles.image : ''})` }}>

                    </div>

                    <div className="content-doctor">
                        <div className="name-date">
                            <h3>
                                {language === 'vi' ? inforVi : inforEn}
                            </h3>

                            <p>Ngày đặt: {dateBooking} vào lúc: {language === LANGUAGES.VI ? hourVi : hourEn}</p>
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
                <p className="mt-4">
                    Giá khám : {language === LANGUAGES.VI ? priceVi : priceEn}
                </p>
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
