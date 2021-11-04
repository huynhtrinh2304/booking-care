import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import './DetailDoctor.scss'
import HomeHeader from '../../HomePage/HomeHeader'

import 'react-toastify/dist/ReactToastify.css';
import { getDetailDoctorService, getInforDoctorService } from '../../../services/doctorService';
import DoctorSchedule from './DoctorSchedule'
import DoctorExtraInfor from './DoctorExtraInfor'





class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            moreDetailDoctor: {}

        }


    }

    async componentDidMount() {
        let id = this.props.match.params.id;
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getDetailDoctorService(id);
            this.setState({
                detailDoctor: res.inforDoctor
            })
        }

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let res = await getInforDoctorService(id);
            this.setState({
                moreDetailDoctor: res.inforDoctor.doctorInfor
            })
        }


    }

    componentDidUpdate(prevProps, prevState) {


    }




    render() {

        let language = this.props.language;
        let inforVi = '';
        let inforEn = '';

        if (this.state.detailDoctor && this.state.detailDoctor.positionData) {
            inforEn = `${this.state.detailDoctor.positionData.valueEn}, ${this.state.detailDoctor.firstName} ${this.state.detailDoctor.lastName} `;
            inforVi = `${this.state.detailDoctor.positionData.valueVi}, ${this.state.detailDoctor.lastName} ${this.state.detailDoctor.firstName} `;

        }



        return (
            <>
                <HomeHeader />

                <div className="doctor-detail-container">
                    <div className="schedule-and-infor-doctor">

                        <div className="intro-doctor">
                            <div className="avatar-doctor" style={{ backgroundImage: `url(${this.state.detailDoctor && this.state.detailDoctor.image ? this.state.detailDoctor.image : ''})` }}>

                            </div>

                            <div className="content-doctor">
                                <h1>
                                    {language === 'vi' ? inforVi : inforEn}
                                </h1>
                                <div className="content">
                                    <p>
                                        {
                                            this.state.detailDoctor && this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.description &&
                                            <span dangerouslySetInnerHTML={{ __html: this.state.detailDoctor.Markdown.description }}></span>
                                        }
                                    </p>
                                </div>

                                <div className="button-social">
                                    <button className="btn-like">
                                        <i className="far fa-thumbs-up"></i> Like
                                    </button>
                                    <button className="btn-share">
                                        <i className="far fa-share-square"></i> Share
                                    </button>

                                </div>

                            </div>
                        </div>

                        <div className="schedule-doctor mt-4">
                            <div className="content-left">
                                <DoctorSchedule
                                    id={this.props.match.params.id}
                                />
                            </div>

                            <div className="content-right">
                                <DoctorExtraInfor
                                    id={this.props.match.params.id}
                                />
                            </div>
                        </div>


                    </div>


                    <div className="detail-infor-doctor">
                        <div className="block-content-detail">
                            {
                                this.state.detailDoctor && this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.contentHtml &&
                                <div dangerouslySetInnerHTML={{ __html: this.state.detailDoctor.Markdown.contentHtml }}></div>
                            }

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
