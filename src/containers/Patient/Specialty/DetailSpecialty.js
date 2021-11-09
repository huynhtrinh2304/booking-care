import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import { withRouter } from 'react-router';
import { getAllDoctorBySpecialtyIdService } from '../../../services/specialtyService'
import Footer from '../../HomePage/Footer/Footer'






class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            descriptionHtml: '',
            imageSpecialty: ''
        }


    }

    async componentDidMount() {
        let result = await getAllDoctorBySpecialtyIdService(this.props.match.params.id);
        this.setState({
            doctors: result.data,
            descriptionHtml: result && result.specialty && result.specialty.descriptionHtml && result.specialty.descriptionHtml,
            imageSpecialty: result && result.specialty && result.specialty.image && result.specialty.image,
        })
    }

    async componentDidUpdate(prevProps, prevState) {

    }



    render() {
        let { doctors, descriptionHtml, imageSpecialty, } = this.state;

        imageSpecialty = new Buffer(imageSpecialty, 'base64').toString('binary');

        return (
            <>
                <HomeHeader />

                <div className="content-markdown-specialty" style={{ backgroundImage: `url(${imageSpecialty})` }}>
                    <div className="block-content-specialty" >
                        <span dangerouslySetInnerHTML={{ __html: descriptionHtml }}></span>
                    </div>
                </div>

                <div className="container-detail-specialty">
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

    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
