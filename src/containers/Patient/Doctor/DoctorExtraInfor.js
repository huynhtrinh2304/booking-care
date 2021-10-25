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
import './DoctorExtraInfor.scss'



class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moreDetailDoctor: {},
            showMoreDetail: false,

        }


    }

    async componentDidMount() {

        if (this.props.id) {
            let res = await getInforDoctorService(this.props.id);
            this.setState({
                moreDetailDoctor: res.inforDoctor.doctorInfor
            })
        }


    }

    componentDidUpdate(prevProps, prevState) {


    }

    handleShowMoreDetail = () => {
        this.setState({
            showMoreDetail: !this.state.showMoreDetail
        })
    }


    render() {
        let { moreDetailDoctor, showMoreDetail } = this.state;
        let language = this.props.language;
        let priceVi, priceEn;

        if (moreDetailDoctor && moreDetailDoctor.priceData) {
            priceVi = moreDetailDoctor.priceData.valueVi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ';
            priceEn = moreDetailDoctor.priceData.valueEn + ' USD';
        }

        return (
            <div className="more-detail-doctor">
                <h3 className="location">ĐỊA CHỈ KHÁM</h3>
                <div className="name-clinic">
                    <p>{moreDetailDoctor && moreDetailDoctor.nameClinic && moreDetailDoctor.nameClinic}</p>
                    <span>{moreDetailDoctor && moreDetailDoctor.addressClinic && moreDetailDoctor.addressClinic}</span>
                </div>
                <div className={showMoreDetail ? "price-doctor " : "price-doctor display-flex"}>
                    <p className="price">Giá khám:</p>
                    {showMoreDetail === false &&
                        <>
                            <span className="mr-2">
                                {moreDetailDoctor &&
                                    moreDetailDoctor.priceData &&
                                    language === LANGUAGES.VI ? priceVi : priceEn
                                }
                                .
                            </span>
                            <p className="show-more-detail" onClick={this.handleShowMoreDetail}>
                                Xem chi tiết
                            </p>
                        </>
                    }

                    {showMoreDetail &&
                        <>
                            <div className="more-content-detail mb-3">
                                <div className="main-content">
                                    <div className="content-top">
                                        <div className="title-top">
                                            <p>Giá khám</p>
                                            <p>
                                                {moreDetailDoctor &&
                                                    moreDetailDoctor.priceData &&
                                                    language === LANGUAGES.VI ? priceVi : priceEn
                                                }
                                            </p>
                                        </div>
                                        <p className="note">Được ưu tiên khám trước khi đật khám qua BookingCare. Giá khám cho người nước ngoài là 30 USD</p>
                                    </div>
                                    <div className="content-down">
                                        <p className="title-down">Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ</p>
                                    </div>
                                </div>
                            </div>
                            <p className="show-more-detail" onClick={this.handleShowMoreDetail}>
                                Ẩn bảng giá
                            </p>
                        </>
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);




