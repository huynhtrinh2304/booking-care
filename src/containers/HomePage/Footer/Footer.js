import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './Footer.scss'




class Footer extends Component {


    render() {



        return (

            <div className="footer-container">
                <div className="footer">
                    <div className="waves">
                        <div className="wave" id="wave1"></div>
                        <div className="wave" id="wave2"></div>
                        <div className="wave" id="wave3"></div>
                        <div className="wave" id="wave4"></div>
                    </div>

                    <ul className="menu">
                        <li className="menu__item"><a className="menu__link" href="#">Home</a></li>
                        <li className="menu__item"><a className="menu__link" href="#">About</a></li>
                        <li className="menu__item"><a className="menu__link" href="#">Services</a></li>
                        <li className="menu__item"><a className="menu__link" href="#">Team</a></li>
                        <li className="menu__item"><a className="menu__link" href="#">Contact</a></li>
                    </ul>
                    <p>&copy; 2021 Nadine Coelho | All Rights Reserved</p>
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




export default connect(mapStateToProps, mapDispatchToProps)(Footer);





