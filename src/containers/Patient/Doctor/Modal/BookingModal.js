import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import './BookingModal.scss'
import { LANGUAGES, CommonUtils } from '../../../../utils';
import * as actions from '../../../../store/actions'



class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }



    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {


    }

    toggle = () => {
        this.props.toggleModalBooking();
    };

    handleAcceptBooking = () => {
        console.log('đâsds');

    }



    render() {

        let { language, doctorDetail } = this.props;
        let hourVi, hourEn;
        if (doctorDetail && doctorDetail.timeTypeData) {
            hourVi = doctorDetail.timeTypeData.valueVi;
            hourEn = doctorDetail.timeTypeData.valueEn;
        }

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'


            >
                <ModalHeader toggle={() => this.toggle()}>
                    ĐẶT LỊCH KHÁM: <span>{language === LANGUAGES.VI ? hourVi : hourEn}</span>
                </ModalHeader>

                <ModalBody>

                    <div className="form-row">

                        <div className="form-group col-md-6">
                            <label>Họ tên</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group col-md-6">
                            <label>Số điện thoại</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group col-md-6">
                            <label>Địa chỉ Email</label>
                            <input type="text" className="form-control" />

                        </div>
                        <div className="form-group col-md-6">
                            <label>Địa chỉ liên hệ</label>
                            <input type="text" className="form-control" />

                        </div>

                        <div className="form-group col-md-6">
                            <label>Đặt cho ai</label>
                            <input type="text" className="form-control" />

                        </div>

                        <div className="form-group col-md-6">
                            <label>Giới tính</label>
                            <input type="text" className="form-control" />
                        </div>

                        <div className="form-group col-md-12">
                            <label>Lý do khám</label>
                            <input type="text" className="form-control" />
                        </div>

                    </div>

                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={this.handleAcceptBooking}>Xác nhận</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Hủy</Button>
                </ModalFooter>
            </Modal>
        )
    }






}






const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
