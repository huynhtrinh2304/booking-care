import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import './Speciality.scss';
import { getAllSpecialtyService } from '../../../../services/specialtyService'
import { withRouter } from 'react-router';





class Speciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataSpecialty: [],
        }
    }


    async componentDidMount() {
        let data = await getAllSpecialtyService();
        this.setState({ listDataSpecialty: data.data });

    }


    handleViewDetailSpecialty = (value) => {
        this.props.history.push(
            `detail-specialty/${value.id}`,
            {
                descriptionHtml: value.descriptionHtml,
                image: value.image,

            }

        )
    }



    render() {


        let { listDataSpecialty } = this.state;

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

                            {listDataSpecialty && listDataSpecialty.length > 0 &&
                                listDataSpecialty.map((item, index) => {
                                    let imageSpecialty = '';
                                    if (item.image) {
                                        imageSpecialty = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className="block-slide-speciality" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                            <div
                                                className="img-customize-speciality"
                                                style={{ backgroundImage: `url(${imageSpecialty})` }}
                                            >
                                            </div>
                                            <p>{item.name}</p>
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
        state: state
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};





export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Speciality));
