import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';
import './MedicalFacility.scss';
import { getAllClinicService } from '../../../../services/clinicService'




class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataClinic: [],
        }
    }

    async componentDidMount() {
        let data = await getAllClinicService();
        this.setState({ listDataClinic: data.data });

    }



    render() {

        let { listDataClinic } = this.state;

        console.log(listDataClinic);

        return (

            <div className="section-carousel-medical-facility">
                <div className="content-carousel">

                    <div className="title-carousel">

                        <h3 className="text-carousel">Các cơ sở y tế mà bạn có thể khám</h3>

                    </div>

                    <div className="container">

                        <Slider {...this.props.settings}>
                            {
                                listDataClinic && listDataClinic.length > 0 && listDataClinic.map((item, index) => {
                                    return (
                                        <a key={index} href={`/detail-clinic/${item.id}`}>
                                            <div className="block-slide-medical-facility" key={index} onClick={this.nextPageDetailClinic}>
                                                <div
                                                    className="img-customize-medical-facility"
                                                    style={{ backgroundImage: `url(${item.image})`, cursor: 'pointer' }}

                                                >

                                                </div>

                                                <p>{item.name}</p>
                                            </div>
                                        </a>

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




export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);





