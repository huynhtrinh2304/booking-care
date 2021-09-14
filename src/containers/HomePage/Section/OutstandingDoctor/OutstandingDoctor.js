import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

import './OutstandingDoctor.scss';





class OutstandingDoctor extends Component {


    render() {

        return (

            <div className="section-carousel-outstanding-doctor">
                <div className="content-carousel">

                    <div className="title-carousel">

                        <h3 className="text-carousel">Bác sĩ nổi bật tuần qua</h3>

                        <div className="more-carousel">
                            <a href="">Xem thêm</a>
                        </div>

                    </div>

                    <div className="container">

                        <Slider {...this.props.settings}>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>

                            <div className="block-slide-outstanding-doctor">
                                <div className="img-customize-outstanding-doctor">

                                </div>

                                <p className="level-doctor">Thạc sĩ, Bác sĩ Phạm Đăng Bảng</p>
                                <p>Da liễu</p>

                            </div>





                        </Slider>
                    </div>
                </div>
            </div>

        );

    }

}




const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        state: state
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};




export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);





