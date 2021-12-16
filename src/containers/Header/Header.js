import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';


// Change Language
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage } from 'react-intl';








class Header extends Component {

    componentDidMount() {

    }




    handleChangeLanguage = (language) => {

        this.props.changeLanguageAppRedux(language);
    }


    render() {
        const { processLogout, language, userInfo } = this.props;


        return (
            <div className="header-container">

                {/* thanh navigator */}
                <div className="header-tabs-container">
                    {userInfo.roleId === 'R2' ? <Navigator menus={doctorMenu} /> : <Navigator menus={adminMenu} />}
                </div>

                <div className="header-languages-logout">

                    <div className="languages">
                        <span>
                            <FormattedMessage id="home-header.welcome" />
                            {userInfo && userInfo.firstName ? userInfo.firstName : ''}
                        </span>
                        <span className={language === LANGUAGES.VI ? "language-vi active" : 'language-vi'} onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VI</span>
                        <span className={language === LANGUAGES.EN ? "language-en active" : 'language-en'} onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
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
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
