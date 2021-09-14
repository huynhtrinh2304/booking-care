import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';


class ModelEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.userEdit.email,
            firstName: this.props.userEdit.firstName,
            lastName: this.props.userEdit.lastName,
            address: this.props.userEdit.address,
        }

    }


    componentDidMount() {

    }



    toggle = () => {
        this.props.toggleModalEditlUser();

    };




    handleOnChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        let copyState = { ...this.state }
        copyState[name] = value;

        this.setState({
            ...copyState,
        })

    }


    checkValidateInput() {
        let isValid = true;
        let arrInput = ['firstName', 'lastName', 'address'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Please enter value for input ' + arrInput[i]);
                break;
            }
        }

        return isValid;
    }



    handleUpdateUser = (data, toggle) => {
        this.checkValidateInput();
        this.props.updateUser(data, toggle);


    }






    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()} className={'modal-user-container'}
                size="lg"

            >

                <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>

                <ModalBody>
                    <div className="modal-user-body">

                        <div className="input-container">
                            <label htmlFor="">Email</label>
                            <input

                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={(e) => this.handleOnChangeInput(e)}
                                autoComplete="off"
                                placeholder="Enter your email"
                                disabled

                            />

                        </div>

                        <div className="input-container">

                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.email}
                                onChange={(e) => this.handleOnChangeInput(e)}
                                placeholder="Enter your password"
                                disabled
                            />

                        </div>


                        <div className="input-container">
                            <label htmlFor="">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnChangeInput(e)}
                                placeholder="First Name"

                            />

                        </div>


                        <div className="input-container">

                            <label htmlFor="">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnChangeInput(e)}
                                placeholder="Last Name"

                            />

                        </div>

                        <div className="text-address">
                            <label htmlFor="">Address</label><br />
                            <textarea
                                name="address"
                                onChange={(e) => this.handleOnChangeInput(e)}
                                cols="30"
                                rows="10"
                                value={this.state.address}
                            >
                            </textarea>

                        </div>

                    </div>

                </ModalBody>
                <ModalFooter>

                    <Button
                        color="primary"
                        className="px-2"
                        onClick={() => this.handleUpdateUser(this.state, this.toggle)}>Update User

                    </Button>

                    <Button color="secondary" className="px-2" onClick={() => this.toggle()}>Close</Button>

                </ModalFooter>
            </Modal>




        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModelEditUser);



