import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';

import './OutstandingDoctor.scss';

import * as actions from '../../../../store/actions'





class OutstandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    };



    render() {
        let arrDoctors = this.state.arrDoctors;
        let { language } = this.props;


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
                            {
                                arrDoctors && arrDoctors.length > 0 && arrDoctors.map((value, index) => {
                                    let avatar = '';
                                    if (value.image) {
                                        avatar = new Buffer(value.image, 'base64').toString('binary');
                                    }


                                    let nameVi = `${value.positionData.valueVi}, ${value.firstName},${value.lastName}`
                                    let nameEn = `${value.positionData.valueEn}, ${value.firstName},${value.lastName}`

                                    return (
                                        <div key={index} className="block-slide-outstanding-doctor">
                                            <div
                                                className="img-customize-outstanding-doctor"
                                                style={{ backgroundImage: `url(${avatar})` }}
                                            >
                                            </div>

                                            <p className="level-doctor">{language == 'vi' ? nameVi : nameEn}</p>
                                            <p>Da liễu</p>

                                        </div>
                                    )
                                })
                            }

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
        state: state,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};




export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);





