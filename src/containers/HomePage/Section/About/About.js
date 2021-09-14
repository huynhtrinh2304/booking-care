import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './About.scss'




class About extends Component {


    render() {
        let logo = '../../../../assets/logo-media/vnexpress.png'


        return (

            <div className="section-about">
                <div className="title-video">
                    <h3>Truyền thông nói về BookingCare</h3>
                </div>

                <div className="content-about">

                    <div className="video">

                        <iframe
                            width="650"
                            height="370"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>

                    </div>

                    <div className="logo-media">



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




export default connect(mapStateToProps, mapDispatchToProps)(About);





