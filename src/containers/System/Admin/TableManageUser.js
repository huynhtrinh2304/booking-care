import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";



class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            testDelete: false,
            undoDelete: true,
        }
    }

    componentDidMount() {
        this.props.getAllUsersRedux();

    }

    componentDidUpdate(prevProps) {

        if (prevProps.users !== this.props.users) {
            this.setState({ usersRedux: this.props.users })
        }

    }




    handleDeleteUser = (id) => {

        toast.warning(
            <Undo
                undoUser={this.undoUser}
                id={id}
                deleteUserById={this.props.deleteUserById}
            />, {
            position: toast.POSITION.TOP_CENTER
        });


    }

    handleEditUser = (id) => {

    }




    render() {
        let users = this.state.usersRedux;

        return (
            <div className="users-container">

                <h1>{this.state.reRender}</h1>

                <div className="users-table mt-3">
                    <table id="customers">
                        <thead className="text-center">
                            <tr>

                                <th className="text-center">Email</th>
                                <th className="text-center">First Name</th>
                                <th className="text-center">Last Name</th>
                                <th className="text-center">Address</th>
                                <th className="text-center">Action</th>

                            </tr>
                        </thead>


                        <tbody>

                            {users && users.map((user, index) => {

                                return (
                                    <tr key={index} id={user.id}>

                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>

                                        <td className="text-center" style={{ maxWidth: '120px' }}>
                                            <button type="button" className="btn btn-primary" onClick={() => { this.handleEditUser(user.id) }} ><i className="fas fa-user-edit"></i></button>

                                            <button type="button" className="btn btn-danger" onClick={() => { this.handleDeleteUser(user.id) }} ><i className="fas fa-user-minus"></i></button>
                                        </td>

                                    </tr>
                                )
                            })
                            }



                        </tbody>

                    </table>

                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.dataUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsersRedux: () => dispatch(actions.getAllUsersRedux()),
        deleteUserById: (id) => dispatch(actions.deleteUserById(id)),

    };
};






class Undo extends Component {


    handleDestroyClick = () => {
        this.props.deleteUserById(this.props.id);

    };


    render() {
        return (
            <div className="modal-comfirm container">
                <h4>Do you want delete user?</h4>
                <div className="btn-confirm">
                    <button className="btn btn-danger destroy" onClick={this.handleDestroyClick}>Destroy</button>

                    <button className="btn btn-primary undo">Undo</button>
                </div>
            </div>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
