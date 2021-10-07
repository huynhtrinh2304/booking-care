import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'


import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';




class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            contentHtml: '',
            contentMarkdown: '',
            selectedDoctor: null,
            description: '',

        }
    }


    componentDidMount() {

    }





    handleEditorChange = (data) => {

        this.setState({
            contentHtml: data.html,
            contentMarkdown: data.text,
        })


    }

    saveContentMarkdown = () => {
        console.log(this.state);
    }

    handleChange = (selectedDoctor) => {

        this.setState({ selectedDoctor: selectedDoctor });

    };

    handleChangeTextArea = (e) => {
        this.state.description = e.target.value
        this.setState({
            description: e.target.value,
        })

    }




    render() {
        let mdParser = new MarkdownIt(/* Markdown-it options */);
        let { selectedDoctor } = this.state;
        let options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
        ];


        return (
            <div className="container-markdown container mt-5">

                <h3 className="text-center mb-4">Add more info doctor</h3>

                <div className="form-row mb-4">


                    <div className="select-doctor col">
                        <label htmlFor="">Choose a doctor</label>

                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChange}
                            options={options}
                        />


                    </div>

                    <div className="add-intro col " style={{ display: 'grid' }}>
                        <label htmlFor="">Thông tin giới thiệu</label>
                        <textarea
                            style={{ minHeight: "100px", maxHeight: "100px" }}
                            onChange={(e) => this.handleChangeTextArea(e)}
                            value={this.state.description}
                        >
                            {this.state.description}
                        </textarea>
                    </div>



                </div>



                <MdEditor
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}

                />

                <div className="col-6 text-center mt-5">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.saveContentMarkdown()}
                    >
                        Lưu
                    </button>
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

                    <button className="btn btn-primary undo">Cancel</button>
                </div>
            </div>
        );
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
