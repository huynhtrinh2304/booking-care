import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errorMessage: '',

        }
    }



    handleOnChangeInput(e) {

        this.setState({ [e.target.name]: e.target.value });

    }


    handleShowHidePassword() {
        this.setState({ isShowPassword: !this.state.isShowPassword });
    }


    handleLogin = async (e) => {
        this.state.errorMessage = '';
        try {

            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errorMessage: data.errMessage,
                })
            }

            if (data && data.errCode == 0) {
                this.props.userLoginSuccess(data.user);
            }

        } catch (error) {
            if (error.response) {

                if (error.response.data) {
                    this.setState({
                        errorMessage: error.response.data.message
                    })
                }
            }

        }
    }



    handleLoginEnter = async (e) => {
        if (e.key === 'Enter') {
            this.state.errorMessage = '';
            try {

                let data = await handleLoginApi(this.state.username, this.state.password);
                if (data && data.errCode !== 0) {
                    this.setState({
                        errorMessage: data.errMessage,
                    })
                }

                if (data && data.errCode == 0) {
                    this.props.userLoginSuccess(data.user);
                }

            } catch (error) {
                if (error.response) {

                    if (error.response.data) {
                        this.setState({
                            errorMessage: error.response.data.message
                        })
                    }
                }

            }
        }

    }

    render() {

        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 text-login">Login</div>



                        <div className="col-12 form-group login-input">
                            <label className="mb-1">User name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Enter your username"
                                autoComplete="off"
                                value={this.state.username} onChange={(e) => { this.handleOnChangeInput(e) }}

                            />
                        </div>

                        <div className="col-12 form-group login-input" >
                            <label className="mb-1">Password</label>
                            <div className="custom-input-password">

                                <input
                                    type={this.state.isShowPassword ? "text" : "password"}
                                    className="form-control"
                                    name="password"
                                    placeholder="Enter your password"
                                    autoComplete="off"
                                    value={this.state.password} onKeyDown={(e) => { this.handleLoginEnter(e) }} onChange={(e) => { this.handleOnChangeInput(e) }}

                                />

                                {this.state.password === "" ? null : <span onClick={() => { this.handleShowHidePassword() }}> <i className={this.state.isShowPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i> </span>}




                            </div>


                        </div>



                        <div className="col-12" style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </div>

                        <div className="col-12 ">
                            <button
                                className="btn-login"
                                onClick={(event) => { this.handleLogin(event) }}

                            >
                                Login
                            </button>
                        </div>

                        <div className="col-12 fogot-password">
                            <span className="">Fogot your password</span>

                        </div>

                        <div className="col-12 text-center text-other-login">
                            <span className="">Or Login which with</span>
                        </div>

                        <div className="social-login">
                            <i className="fab fa-facebook-square facebook"></i>
                            <i className="fab fa-google-plus-g google"></i>

                        </div>


                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
    };
};






export default connect(mapStateToProps, mapDispatchToProps)(Login);
