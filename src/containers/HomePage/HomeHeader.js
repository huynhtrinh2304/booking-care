import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';




class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }





    render() {

        let language = this.props.language;

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">

                        <div className="left-content">

                            <i className="fas fa-bars"></i>
                            <div className="header-logo">
                            </div>

                        </div>

                        <div className="center-content">

                            <div className="child-content">

                                <div>
                                    <b><FormattedMessage id="home-header.speciality" /></b>
                                </div>
                                <div className="subs-title"><FormattedMessage id="home-header.search-doctor" /></div>

                            </div>


                            <div className="child-content">

                                <div>
                                    <b><FormattedMessage id="home-header.health-facility" /></b>
                                </div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-room" /></div>


                            </div>


                            <div className="child-content">

                                <div>
                                    <b><FormattedMessage id="home-header.doctor" /></b>
                                </div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-doctor" /></div>

                            </div>


                            <div className="child-content">

                                <div>
                                    <b><FormattedMessage id="home-header.fee" /></b>
                                </div>
                                <div className="subs-title"><FormattedMessage id="home-header.check-health" /></div>

                            </div>



                        </div>


                        <div className="right-content">

                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>

                            <div className="language-vi">
                                <span className={language === LANGUAGES.VI ? "active-vi " : ""} onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                            </div>

                            <div className="language-en">
                                <span className={language === LANGUAGES.EN ? "active-en " : ""} onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>


                        </div>


                    </div>
                </div>

                <div className="bonus"></div>




            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
