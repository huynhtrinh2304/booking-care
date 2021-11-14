import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Toast } from 'reactstrap';
import { sendMailForPatientService } from '../../../../services/doctorService'
import { CommonUtils } from '../../../../utils';
import Loading from '../../../../components/Loading/Loading';




class DoneConfirm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pathImage: '',
            isLoading: false
        }


    }

    async componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {


    }


    toggle = () => {
        this.props.toggleParent();
    };

    handleSendMail = async () => {
        this.props.data.path = this.state.pathImage
        this.setState({
            isLoading: true
        })

        let res = await sendMailForPatientService(this.props.data);
        if (res && res.errCode === 0) {
            this.props.setAgainPatient();
            this.toggle();
            this.setState({
                isLoading: false
            })
            toast.success('Ok');
        } else {
            this.toggle();
            toast.error('Error');
        }

    }

    chooseImage = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file && file.type.indexOf('image') != -1) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                pathImage: base64
            })
        }
    }


    render() {
        let { data } = this.props;


        return (
            <>
                {
                    this.state.isLoading &&
                    <div className="block-cover" style={{ display: this.state.isLoading ? 'block' : 'none' }}>
                        <Loading />
                    </div>
                }


                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    fullscreen='sm'
                >
                    <ModalHeader toggle={() => this.toggle()}>
                        <div>
                            <h2>form</h2>
                        </div>
                    </ModalHeader>

                    <ModalBody>

                        <div className="form-row">

                            <div className="form-group col-md-6">
                                <label>Họ tên bệnh nhân</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={data.fullName}
                                    disabled
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label>Hóa đơn</label>
                                <input
                                    type="file"
                                    className="form-control-file"
                                    accept="image/png, image/gif, image/jpeg"
                                    onChange={(e) => this.chooseImage(e)}
                                />
                            </div>




                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSendMail}>Xác nhận</Button>{' '}

                    </ModalFooter>
                </Modal>
            </>

        )
    }






}






const mapStateToProps = state => {
    return {

    };
};


// Actions
const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoneConfirm);
