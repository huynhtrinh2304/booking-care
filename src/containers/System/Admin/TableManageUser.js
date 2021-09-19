import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'



class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],


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
        this.props.deleteUserById(id);
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
                                    <tr key={index}>

                                        <td>{user.email}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.address}</td>

                                        <td className="text-center" style={{ maxWidth: '120px' }}>
                                            <button type="button" className="btn btn-primary" ><i className="fas fa-user-edit"></i></button>

                                            <button type="button" onClick={() => { this.handleDeleteUser(user.id) }} className="btn btn-danger"><i className="fas fa-user-minus"></i></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
