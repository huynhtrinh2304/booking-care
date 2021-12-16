import kham_chuyenkhoa from '../../assets/icon-options/kham_chuyenkhoa.png';
import kham_tuxa from '../../assets/icon-options/kham_tuxa.png';
import kham_tongquat from '../../assets/icon-options/kham_tongquat.png';
import dichvu_xetnghiem from '../../assets/icon-options/dichvu_xetnghiem.png';
import suckhoe_tinhthan from '../../assets/icon-options/suckhoe_tinhthan.png';
import kham_nhakhoa from '../../assets/icon-options/kham_nhakhoa.png';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeBanner.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';










class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }


    render() {

        return (


            <div className="home-header-banner">
                <div className="content-up">

                    <div className="title-1">
                        <FormattedMessage id="banner.title1" />
                    </div>
                    <div className="title-2">
                        <FormattedMessage id="banner.title2" />

                    </div>
                    <div className="search">
                        {/* <i className="fas fa-search"></i>
                        <input type="text" /> */}

                    </div>

                </div>

                <div className="content-down">

                    <div className="options">

                        <div className="option-child">

                            <div className="icon-child">
                                <img src={kham_chuyenkhoa} alt="" />
                            </div>

                            <p className="text-child"><FormattedMessage id="banner.text-child1" /></p>

                        </div>

                        <div className="option-child">

                            <div className="icon-child">
                                <img src={kham_tuxa} alt="" />
                            </div>

                            <p className="text-child"><FormattedMessage id="banner.text-child2" /></p>

                        </div>

                        <div className="option-child">

                            <div className="icon-child">
                                <img src={kham_tongquat} alt="" />
                            </div>

                            <p className="text-child"><FormattedMessage id="banner.text-child3" /></p>

                        </div>

                        <div className="option-child">

                            <div className="icon-child">
                                <img src={dichvu_xetnghiem} alt="" />
                            </div>

                            <p className="text-child"><FormattedMessage id="banner.text-child4" /></p>

                        </div>

                        {/* <div className="option-child">

                            <div className="icon-child">
                                <img src={suckhoe_tinhthan} alt="" />
                            </div>

                            <p className="text-child"><FormattedMessage id="banner.text-child5" /></p>

                        </div>

                        <div className="option-child">

                            <div className="icon-child">
                                <img src={kham_nhakhoa} alt="" />
                            </div>

                            <p className="text-child"><FormattedMessage id="banner.text-child6" /></p>

                        </div> */}

                    </div>





                </div>


            </div>

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
