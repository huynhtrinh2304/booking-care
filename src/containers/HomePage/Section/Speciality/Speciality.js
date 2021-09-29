import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

import './Speciality.scss';







class Speciality extends Component {


    render() {

        return (

            <div className="section-carousel-speciality">
                <div className="content-carousel">

                    <div className="title-carousel">

                        <h3 className="text-carousel">Chuyên khoa phổ biến</h3>

                        <div className="more-carousel">
                            <a href="">Xem thêm</a>
                        </div>

                    </div>

                    <div className="container">

                        <Slider {...this.props.settings}>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
                            </div>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
                            </div>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
                            </div>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
                            </div>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
                            </div>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
                            </div>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
                            </div>

                            <div className="block-slide-speciality">
                                <div className="img-customize-speciality">

                                </div>

                                <p>Cơ xương khớp</p>
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





export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
