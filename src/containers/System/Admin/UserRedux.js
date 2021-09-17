import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './UserRedux.scss'


import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';



class UserRedux extends Component {

    constructor(props) {
        super(props);

        this.state = {

            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpenLightBox: false,

            infoUser: {

                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',

            },





        }
    }


    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();


    }



    componentDidUpdate(prevProps, prevState, snapshot) {

        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux
            })
        }



    }




    handleOnChangeImg = (e) => {
        let data = e.target.files;
        let file = data[0];


        if (file && file.type.indexOf('image') != -1) {
            let objecturl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objecturl
            })
        }
    }


    openPreviewImg = () => {

        this.setState({
            isOpenLightBox: true
        })

    }


    handleSaveUser = async () => {
        let isValid = this.validateInput();
        let infoUser = { ...this.state.infoUser }
        if (isValid === false) return;

        await this.props.createNewUser(this.state.infoUser);

        alert(this.props.isCreatedUser[1])
        console.log(this.state.infoUser);
        this.setState({
            infoUser: {
                email: 'a',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
            }
        })
        this.render();

    }

    onChangeInput = (e) => {

        let name = e.target.name
        let value = e.target.value
        this.state.infoUser[name] = value;


    }

    validateInput = () => {

        let isValid = false;
        let arrState =
            [
                'email',
                'password',
                'firstName',
                'lastName',
                'phoneNumber',
                'address',
                'gender',
                'position',
                'role',


            ]


        for (var i = 0; i < arrState.length; i++) {
            if (!this.state.infoUser[arrState[i]]) {
                alert("Missing input: " + arrState[i]);
                return isValid;
            }

        }
        isValid = true;


        return isValid;
    }




    render() {

        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;


        return (
            <div className="user-redux-container">
                <div className="title">
                    Manage users redux
                </div>

                <div className="user-redux-body">

                    <div className="container">

                        <div className="row">

                            <div className="form-group col-12">
                                <h1><FormattedMessage id="manage-user.add" /></h1>
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.email" /></label>
                                <input className="form-control" type="text" name="email" placeholder="Email" onChange={(e) => this.onChangeInput(e)} />
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="text" name="password" placeholder="Password" onChange={(e) => this.onChangeInput(e)} />
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text" name="firstName" placeholder="First name" onChange={(e) => this.onChangeInput(e)} />
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text" name="lastName" placeholder="Last name" onChange={(e) => this.onChangeInput(e)} />
                            </div>


                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text" name="phoneNumber" placeholder="Phone number" onChange={(e) => this.onChangeInput(e)} />
                            </div>

                            <div className="form-group col-9">
                                <label htmlFor=""><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" name="address" placeholder="Address" onChange={(e) => this.onChangeInput(e)} />
                            </div>





                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control" name="gender" onChange={(e) => this.onChangeInput(e)}>
                                    <option defaultValue value=''>Choose...</option>
                                    {genders && genders.length > 0 && genders.map((data, index) => {
                                        return <option key={index} value={data.key}>{language === 'vi' ? data.valueVi : data.valueEn}</option>
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control" name="position" onChange={(e) => this.onChangeInput(e)}>
                                    <option defaultValue value=''>Choose...</option>
                                    {positions && positions.length > 0 && positions.map((data, index) => {
                                        return <option key={index} value={data.key}>{language === 'vi' ? data.valueVi : data.valueEn}</option>
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.role-id" /></label>
                                <select className="form-control" name="role" onChange={(e) => this.onChangeInput(e)}>
                                    <option defaultValue value=''>Choose...</option>
                                    {roles && roles.length > 0 && roles.map((data, index) => {
                                        return <option key={index} value={data.key}>{language === 'vi' ? data.valueVi : data.valueEn}</option>
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-3">

                                <div className="preview-img-container">
                                    <input
                                        id="preview-img"
                                        type="file"
                                        hidden
                                        onChange={(e) => this.handleOnChangeImg(e)}

                                    />
                                    <label className="label-upload" htmlFor="preview-img" >Tải ảnh </label>

                                    {this.state.previewImgURL &&
                                        <div className="content-img">
                                            <div className="preview-img-content"
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                onClick={() => this.openPreviewImg()}
                                            >
                                            </div>

                                        </div>
                                    }


                                </div>
                            </div>

                            <div className="form-group col-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                >

                                    <FormattedMessage id="manage-user.save" />

                                </button>
                            </div>


                        </div>






                    </div>

                </div>

                {
                    this.state.isOpenLightBox && <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenLightBox: false })}

                    />
                }

            </div>
        )
    }

}
















const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isCreatedUser: state.admin.isCreatedUser,




    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),




        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
