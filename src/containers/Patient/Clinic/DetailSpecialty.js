import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import { withRouter } from 'react-router';
import { getAllDoctorBySpecialtyIdService } from '../../../services/specialtyService';
import Footer from '../../HomePage/Footer/Footer';
import { getAllCodeServicesApi } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant'





class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            keepDoctor: [],
            descriptionHtml: '',
            imageSpecialty: '',
            province: [],
            isHiddenMarkdown: true,
        }


    }

    async componentDidMount() {
        let result = await getAllDoctorBySpecialtyIdService(this.props.match.params.id);
        let province = await getAllCodeServicesApi("PROVINCE");

        this.setState({
            doctors: result.data,
            keepDoctor: result.data,
            descriptionHtml: result && result.specialty && result.specialty.descriptionHtml && result.specialty.descriptionHtml,
            imageSpecialty: result && result.specialty && result.specialty.image && result.specialty.image,
            province: province.data
        })
    }

    async componentDidUpdate(prevProps, prevState) {

    }

    selectedProvince = async (e) => {
        let { keepDoctor } = this.state;
        let value = e.target.value;
        let dataFilter = keepDoctor.filter((item) => {
            return item.provinceId === value;
        });

        if (value === "ALL") {
            this.setState({
                doctors: keepDoctor
            });
        } else {

            this.setState({
                doctors: dataFilter
            });

        }

    }


    handleContentMarkdown = (e) => {
        e.preventDefault();
        this.setState({ isHiddenMarkdown: !this.state.isHiddenMarkdown });
    }



    render() {
        let { doctors, descriptionHtml, imageSpecialty, province, isHiddenMarkdown } = this.state;
        let { language } = this.props;
        imageSpecialty = new Buffer(imageSpecialty, 'base64').toString('binary');



        return (
            <>
                <HomeHeader />

                <div
                    className="content-markdown-specialty"
                    style={{ backgroundImage: `url(${imageSpecialty})` }}
                >
                    <div className="block-content-specialty">
                        <div
                            className={isHiddenMarkdown === true ? "content-specialty hidden-markdown" : 'content-specialty'}

                        >
                            <span dangerouslySetInnerHTML={{ __html: descriptionHtml }}></span>
                        </div>

                        {
                            isHiddenMarkdown === true ?
                                <a href="" onClick={this.handleContentMarkdown}>Đọc thêm</a> :
                                <a href="" onClick={this.handleContentMarkdown}>Ẩn bớt</a>
                        }

                    </div>

                </div>

                <div className="container-detail-specialty">
                    <div className="block-select-province">
                        <select className="select-province" onChange={this.selectedProvince}>
                            {
                                language === LANGUAGES.VI ? <option value="ALL">Toàn quốc</option> : <option value="ALL">Nationwide</option>
                            }

                            {
                                province && province.length > 0 && province.map((item, index) => {
                                    let proData = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                                    return (
                                        <option key={index} value={item.keyMap}>{proData}</option>
                                    )
                                })
                            }

                        </select>
                    </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty));
