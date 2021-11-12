import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailClinic.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import { withRouter } from 'react-router';
import Footer from '../../HomePage/Footer/Footer';
import { getAllCodeServicesApi } from '../../../services/userService';
import { getAllDoctorByClinicIdService } from '../../../services/clinicService';


import { LANGUAGES } from '../../../utils/constant'





class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            keepDoctor: [],
            descriptionHtml: '',
            imageClinic: '',
            addressClinic: '',
        }


    }

    async componentDidMount() {
        let result = await getAllDoctorByClinicIdService(this.props.match.params.id);
        console.log(result);

        this.setState({
            doctors: result.data,
            keepDoctor: result.data,
            addressClinic: result.clinic.address,
            descriptionHtml: result && result.clinic && result.clinic.descriptionHtml && result.clinic.descriptionHtml,
            imageClinic: result && result.clinic && result.clinic.image && result.clinic.image,
        })
    }

    async componentDidUpdate(prevProps, prevState) {

    }


    render() {
        let { doctors, descriptionHtml, imageClinic, isHiddenMarkdown } = this.state;
        let { language } = this.props;
        imageClinic = new Buffer(imageClinic, 'base64').toString('binary');



        return (
            <>
                <HomeHeader />

                <div
                    className="content-markdown-clinic"
                    style={{ backgroundImage: `url(${imageClinic})` }}
                >
                </div>

                <div className="block-content-clinic">
                    <span dangerouslySetInnerHTML={{ __html: descriptionHtml }}></span>

                </div>

                <div className="container-detail-clinic">

                    {
                        doctors && doctors.length > 0 && doctors.map((item, index) => {

                            return (
                                <div className="block-content-detail" key={index}>
                                    <div className="content-right">
                                        <ProfileDoctor
                                            id={item.doctorId}
                                            hiddenTime={true}
                                            hiddenPrice={true}
                                        />
                                        <a className="ml-4" href={`/detail-doctor/${item.doctorId}`}>Xem thêm</a>
                                    </div>
                                    <div className="content-left">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule
                                                id={item.doctorId}
                                            />
                                        </div>
                                        <div className="doctor-extraInfor">
                                            <DoctorExtraInfor
                                                id={item.doctorId}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );


                        })
                    }
                </div>

                <Footer />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailClinic));
