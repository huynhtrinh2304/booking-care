import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'






class DetailSpecialty extends Component {

    constructor(props) {
        super(props);



    }

    async componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {


    }




    render() {



        return (
            <div>
                hello world
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
