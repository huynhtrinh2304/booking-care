import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

import './HandBook.scss';

import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";



class Handbook extends Component {


    render() {
        let settings = {

            infinite: true,
            speed: 1000,
            slidesToShow: 2,
            slidesToScroll: 1,
            // autoplay: true,

        };
        return (

            <div className="section-carousel-handbook">
                <div className="content-carousel">

                    <div className="title-carousel">

                        <h3 className="text-carousel">Cẩm nang</h3>

                        <div className="more-carousel">
                            <a href="">Tất cả bài viết</a>
                        </div>

                    </div>

                    <div className="container">

                        <Slider {...settings}>

                            <div className="block-slide-handbook">
                                <div className="img-customize-handbook">

                                </div>

                                <p>Khám bệnh từ xa thời Covid-19: nhanh gọn, tiện lợi, hiệu quả tại nhà với bác sĩ giỏi</p>
                            </div>

                            <div className="block-slide-handbook">
                                <div className="img-customize-handbook">

                                </div>

                                <p>Khám bệnh từ xa thời Covid-19: nhanh gọn, tiện lợi, hiệu quả tại nhà với bác sĩ giỏi</p>
                            </div>

                            <div className="block-slide-handbook">
                                <div className="img-customize-handbook">

                                </div>

                                <p>Khám bệnh từ xa thời Covid-19: nhanh gọn, tiện lợi, hiệu quả tại nhà với bác sĩ giỏi</p>
                            </div>

                            <div className="block-slide-handbook">
                                <div className="img-customize-handbook">

                                </div>

                                <p>Khám bệnh từ xa thời Covid-19: nhanh gọn, tiện lợi, hiệu quả tại nhà với bác sĩ giỏi</p>
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




export default connect(mapStateToProps, mapDispatchToProps)(Handbook);





