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
                                <input className="form-control" type="text" />
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.password" /></label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.first-name" /></label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.last-name" /></label>
                                <input className="form-control" type="text" />
                            </div>


                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className="form-control" type="text" />
                            </div>

                            <div className="form-group col-9">
                                <label htmlFor=""><FormattedMessage id="manage-user.address" /></label>
                                <input className="form-control" type="text" />
                            </div>





                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control">
                                    <option defaultValue>Choose...</option>
                                    {genders && genders.length > 0 && genders.map((data, index) => {
                                        return <option key={index}>{language === 'vi' ? data.valueVi : data.valueEn}</option>
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control">
                                    <option defaultValue>Choose...</option>
                                    {positions && positions.length > 0 && positions.map((data, index) => {
                                        return <option key={index}>{language === 'vi' ? data.valueVi : data.valueEn}</option>
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-3">
                                <label htmlFor=""><FormattedMessage id="manage-user.role-id" /></label>
                                <select className="form-control">
                                    <option defaultValue>Choose...</option>
                                    {roles && roles.length > 0 && roles.map((data, index) => {
                                        return <option key={index}>{language === 'vi' ? data.valueVi : data.valueEn}</option>
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

                                    <div className="content-img">

                                        {
                                            this.state.previewImgURL && <div className="preview-img-content"
                                                style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                                onClick={() => this.openPreviewImg()}
                                            >
                                            </div>
                                        }
                                    </div>

                                </div>
                            </div>

                            <div className="form-group col-3">
                                <button className="btn btn-primary"><FormattedMessage id="manage-user.save" /></button>
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



    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())



        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
