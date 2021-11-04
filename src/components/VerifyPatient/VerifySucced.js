import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VerifySucced.scss';






class DetailDoctor extends Component {

    constructor(props) {
        super(props);



    }

    async componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {


    }




    render() {



        return (

            <div className="container-verify-succed">
                <div class="site">
                    <div class="sketch">
                        <div class="bee-sketch red"></div>
                        <div class="bee-sketch blue"></div>
                    </div>

                    <h1>Thanks:
                        <small>Authentication successful</small>
                    </h1>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
