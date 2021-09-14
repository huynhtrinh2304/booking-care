import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserApi, deleteUserApi, updateUserApi } from '../../services/userService';
import { emitter } from '../../utils/emitter';

import ModelCreateUser from './ModelCreateUser';
import ModelEditUser from './ModelEditUser';


class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModelCreateUser: false,
            isOpenModelEditUser: false,
            dataEditUser: {},
            setModal: false,





        }
    }


    changeStateModalCreateUser() {
        this.setState({ isOpenModelCreateUser: true });

    }

    changeStateModalEditUser(user) {
        this.setState({ isOpenModelEditUser: true });
        this.setState({ setModal: true });
        this.state.dataEditUser = user;



    }


    toggleModalCreatelUser = () => {

        this.setState({
            isOpenModelCreateUser: !this.state.isOpenModelCreateUser
        })

    }

    toggleModalEditlUser = () => {

        this.setState({
            isOpenModelEditUser: !this.state.isOpenModelEditUser
        })



    }





    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers("ALL");
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    createNewUser = async (data, toggle) => {


        try {
            let response = await createNewUserApi(data);

            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                this.getAllUsersFromReact();
                toggle();
                emitter.emit('EVENT_CLEAR_MODAL_DATA')

            }



        } catch (error) {
            console.log(error);
        }
    }

    updateUser = async (data, toggle) => {

        try {
            let response = await updateUserApi(data);

            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUsersFromReact();
                toggle();
                setTimeout(() => alert(response.message), 500)

            }


        } catch (error) {
            console.log(error);
        }
    }



    handleDeleteUser = async (userId) => {
        try {
            let response = await deleteUserApi(userId);
            if (response && response.errCode == 0) {
                this.getAllUsersFromReact();
                alert(response.message)
            } else {

                alert(response.errorMessage)
            }


        } catch (error) {
            console.log(error);
        }

    }




    render() {

        let arrUsers = this.state.arrUsers;

        return (
            <div className="users-container">
                <div className="title text-center">
                    <h1>Manage User</h1>
                </div>

                <ModelCreateUser
                    isOpen={this.state.isOpenModelCreateUser}
                    toggleModalCreatelUser={this.toggleModalCreatelUser}
                    createNewUser={this.createNewUser}
                />


                {

                    this.state.isOpenModelEditUser && <ModelEditUser
                        isOpen={this.state.isOpenModelEditUser}
                        toggleModalEditlUser={this.toggleModalEditlUser}
                        userEdit={this.state.dataEditUser}
                        updateUser={this.updateUser}
                    />
                }


                <div className="mx-4">
                    <button onClick={() => this.changeStateModalCreateUser()} className="btn btn-primary px-3"><i className="fas fa-user-plus"></i> Add new users</button>
                </div>

                <div className="users-table mt-3 mx-4">
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


                            {

                                arrUsers.map((user, index) => {
                                    return (

                                        <tr key={index}>

                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td className="text-center">
                                                <button type="button" className="btn" onClick={() => this.changeStateModalEditUser(user)} style={{ marginRight: '20px', width: '50px', height: '50px', backgroundColor: 'orange' }}><i className="fas fa-user-edit"></i></button>

                                                <button type="button" className="btn" onClick={() => this.handleDeleteUser(user.id)} style={{ width: '50px', height: '50px', backgroundColor: 'red' }}><i className="fas fa-user-minus"></i></button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
