import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';

class ModelCreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            address: "",
        }

        this.listenToEmmiter();
    }


    componentDidMount() {
    }


    listenToEmmiter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                address: "",
            })
        })
    }

    toggle = () => {
        this.props.toggleModalCreatelUser();
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
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Please enter value for input ' + arrInput[i]);
                break;
            }
        }

        return isValid;
    }


    handleAddNewUser = () => {

        let idValid = this.checkValidateInput();

        if (idValid) {
            this.props.createNewUser(this.state, this.toggle);
        }


    }






    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()} className={'modal-user-container'}
                size="lg"

            >

                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>

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

                            />

                        </div>

                        <div className="input-container">
                            <label htmlFor="">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(e) => this.handleOnChangeInput(e)}
                                placeholder="Enter your password"

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
                        onClick={() => this.handleAddNewUser()}>Create a new user

                    </Button>{' '}

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

export default connect(mapStateToProps, mapDispatchToProps)(ModelCreateUser);



