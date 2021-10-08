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
            selectedDoctors: '',
            description: '',
            listDocs: [],

        }
    }


    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                listDocs: this.props.doctors
            })
        }
    }



    handleEditorChange = (data) => {

        this.setState({
            contentHtml: data.html,
            contentMarkdown: data.text,
        })


    }

    saveContentMarkdown = () => {
        let state = this.state;
        let { listDocs, ...inforDoctor } = state

        if (!inforDoctor.selectedDoctors) {
            alert('Please select a doctor');
            return;
        }

        if (!inforDoctor.description) {
            alert('You missing description for doctor ');
            return;
        }

        if (!inforDoctor.contentMarkdown) {
            alert('You missing content for doctor ');
            return;
        }




        this.props.postInforDoctor(inforDoctor);
    }

    handleChange = async (selectedDoctor) => {

        await this.setState({ selectedDoctors: selectedDoctor.value });

    };

    handleChangeTextArea = (e) => {
        this.state.description = e.target.value
        this.setState({
            description: e.target.value,
        })

    }






    render() {
        let mdParser = new MarkdownIt(/* Markdown-it options */);
        // let { selectedDoctor } = this.state;
        let options = [];
        let { ...state } = this.state;



        state.listDocs.map((doctor) => {
            options.push({ value: doctor.id, label: `${doctor.lastName} ${doctor.firstName}` });
        })




        return (
            <div className="container-markdown container mt-5">

                <h3 className="text-center mb-4">Add more info doctor</h3>

                <div className="form-row mb-4">


                    <div className="select-doctor col">
                        <label htmlFor="">Choose a doctor</label>

                        <Select
                            // value={selectedDoctor}
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
                    style={{ height: '300px' }}
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
        doctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        postInforDoctor: (inforDoctor) => dispatch(actions.postInforDoctor(inforDoctor))

    };
};






export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
