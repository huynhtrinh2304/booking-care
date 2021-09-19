import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'



class Undo extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }









    render() {
        let users = this.state.usersRedux;

        return (
            <div>
                <h3>
                    Row Deleted <button onClick={handleClick}>UNDO</button>
                </h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Undo);
