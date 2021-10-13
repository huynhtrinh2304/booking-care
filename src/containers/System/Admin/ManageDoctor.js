import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailDoctorService, putUpdateDetailDoctor } from '../../../services/doctorService'
import { toast } from 'react-toastify';



class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            contentHtml: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            isUpdating: false,
            options: []

        }
    }


    componentDidMount() {
        this.props.fetchAllDoctors();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.doctors !== this.props.doctors) {
            this.optionsSelectedDoctor(this.props.doctors);

        }

    }



    handleEditorChange = (data) => {

        this.setState({
            contentHtml: data.html,
            contentMarkdown: data.text,
        })


    }


    addContentMarkdown = async () => {
        let state = this.state;
        let { options, ...inforDoctor } = state


        if (!inforDoctor.selectedDoctor) {
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




        let res = this.props.postInforDoctor(inforDoctor);
        if (res) {
            await this.setState({
                isUpdating: false,
                contentMarkdown: '',
                description: '',

            })
        }



    }


    updateContentMarkdown = async () => {
        let state = this.state;
        let { options, ...inforDoctor } = state

        let res = await putUpdateDetailDoctor(inforDoctor);
        if (res && res.errCode === 0) {
            toast.success(res.message);
            await this.setState({
                isUpdating: false,
                contentMarkdown: '',
                description: '',


            })

        }
    }


    handleChange = async (selectedDoctor) => {

        let res = await getDetailDoctorService(selectedDoctor.value);



        if (res.inforDoctor.Markdown) {
            await this.setState({
                isUpdating: true,
                contentMarkdown: res.inforDoctor.Markdown.contentMarkdown,
                contentHtml: res.inforDoctor.Markdown.contentHtml,
                description: res.inforDoctor.Markdown.description,


            })
        }

        if (res.inforDoctor.Markdown === 0) {
            await this.setState({
                isUpdating: false,
                contentMarkdown: '',
                contentHtml: '',
                description: '',
            })
        }

        this.setState({ selectedDoctor: selectedDoctor.value })

    };



    handleChangeTextArea = (e) => {
        this.state.description = e.target.value
        this.setState({
            description: e.target.value,
        })

    }



    optionsSelectedDoctor = (list) => {

        list.map((doctor) => {
            this.state.options.push({ value: doctor.id, label: `${doctor.lastName} ${doctor.firstName}` });
        })

        return list;
    }


    onClickSelect = () => {
        console.log('a');
    }

    render() {

        let mdParser = new MarkdownIt(/* Markdown-it options */);

        return (
            <div className="container-markdown container mt-5">

                <h3 className="text-center mb-4">Add more info doctor</h3>

                <div className="form-row mb-4">


                    <div className="select-doctor col">
                        <label htmlFor="">Choose a doctor</label>

                        <Select
                            onChange={this.handleChange}
                            options={this.state.options}
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
                    value={this.state.contentMarkdown}
                />

                <div className="col-6 text-center mt-5">
                    {this.state.isUpdating === true ?
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => this.updateContentMarkdown()}
                            style={{ width: '85px', borderRadius: '20px' }}
                        >
                            Lưu
                        </button> :

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => this.addContentMarkdown()}
                            style={{ width: '120px', borderRadius: '20px' }}
                        >
                            Thêm thông tin
                        </button>

                    }



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
