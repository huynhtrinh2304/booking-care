import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

import './MedicalFacility.scss';





class MedicalFacility extends Component {


    render() {

        return (

            <div className="section-carousel-medical-facility">
                <div className="content-carousel">

                    <div className="title-carousel">

                        <h3 className="text-carousel">Cơ sở y tế nổi bật</h3>

                        <div className="more-carousel">
                            <a href="">Xem thêm</a>
                        </div>

                    </div>

                    <div className="container">

                        <Slider {...this.props.settings}>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
                            </div>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
                            </div>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
                            </div>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
                            </div>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
                            </div>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
                            </div>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
                            </div>

                            <div className="block-slide-medical-facility">
                                <div className="img-customize-medical-facility">

                                </div>

                                <p>Bệnh viện hữa nghị việt đức</p>
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




export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);





