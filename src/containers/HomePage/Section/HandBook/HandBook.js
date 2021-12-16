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
                        <h3 className="text-carousel">Tại sao nên đặt lịch khám bệnh tại đây</h3>
                    </div>

                    <div className="container block-container">
                        <div className="reason">
                            <img src="https://thumbs.dreamstime.com/b/medical-t
                            eam-icon-male-female-doctor-symbols-medical-team-icon-ma
                            le-female-doctor-symbols-gray-background-123249209.jpg" alt=""
                            />
                            <h5>Những bác sĩ giỏi</h5>
                            <p>
                                Đội ngũ chuyên gia, bác sĩ hàng đầu trong lĩnh vực tiêu hóa và gan mậ
                                t tại Việt Nam. Các bác sĩ đều có thâm niên công tác lâu năm, từng giữ nhi
                                ều trọng trách tại các bệnh viện lớn trong cả nước.
                            </p>
                        </div>
                        <div className="reason">
                            <img src="https://t4.ftcdn.net/jpg/04/60/01/03/360_F_460010376_WoycFjFVtOyIMn5rPokajZYWRNRBI7kG.jpg" alt=""
                            />
                            <h5>Công nghệ tiên tiếng</h5>
                            <p>
                                Áp dụng các công nghệ hiện đại nhấ
                                t trên thế giới, giúp chẩn đoán tốt cả những bệnh lý ph
                                ức tạp nhất, các bệnh lý có tổn thương ở mức siêu nhỏ khó nhận ra bằng mắt thường.
                            </p>
                        </div>
                        <div className="reason">
                            <img src="https://cdn-icons-png.flaticon.com/512/1533/1533792.png" alt=""
                            />
                            <h5>Khử khuẩn 100% vô trùng</h5>
                            <p>
                                100% thiết bị y tế của Phòng khám được khử khuẩn theo tiêu chuẩn khắt khe của Nhật Bản, với hiệu quả làm sạch và khử khuẩn lên tới 94,6%, hạn chế thấp nhất nguy cơ lây chéo bệnh.
                            </p>
                        </div>
                        <div className="reason">
                            <img src="https://sieubet.com/wp-content/uploads/2018/09/vi-dien-tu-icon.png" alt=""
                            />
                            <h5>Chi phí điều trị hợp lý</h5>
                            <p>
                                Trang thiết bị đầu tư đồng bộ, bắt kịp các công nghệ hiện đại nhất trên thế giới, đội ngũ bác sĩ giàu kinh nghiệm nhưng chi phí khám và điều trị tại Hoàng Long rất hợp lý, phù hợp với tất cả mọi người.
                            </p>
                        </div>

                        {/* 
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





                        </Slider> */}
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





