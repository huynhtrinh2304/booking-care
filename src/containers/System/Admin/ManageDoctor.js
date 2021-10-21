import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailDoctorService, putUpdateDetailDoctor } from '../../../services/doctorService';
import { getAllCodeServicesApi } from '../../../services/userService';
import { toast } from 'react-toastify';
import { LANGUAGES } from '../../../utils';



class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Save to markdown table
            contentHtml: '',
            contentMarkdown: '',
            selectedDoctor: '',
            description: '',
            isUpdating: false,
            doctors: [],


            listPrice: [],
            listPayment: [],
            listProvince: [],

            // Save to doctor_infor table
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',








        }
    }


    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchDataFromAllCode();


    }




    componentDidUpdate(prevProps, prevState) {

        if (prevProps.doctors !== this.props.doctors) {
            this.optionsSelectedDoctor(this.props.doctors);
        }

        if (prevProps.dataAllCode !== this.props.dataAllCode) {
            let price = this.buildDataSelect(this.props.dataAllCode.price);
            let payment = this.buildDataSelect(this.props.dataAllCode.payment);
            let province = this.buildDataSelect(this.props.dataAllCode.province);

            this.setState({
                listPrice: price,
                listPayment: payment,
                listProvince: province
            })


        }

        if (prevProps.language !== this.props.language) {
            let price = this.buildDataSelect(this.props.dataAllCode.price);
            let payment = this.buildDataSelect(this.props.dataAllCode.payment);
            let province = this.buildDataSelect(this.props.dataAllCode.province);

            this.setState({
                listPrice: price,
                listPayment: payment,
                listProvince: province
            })

        }



    }


    buildDataSelect = (data) => {
        if (data && data.length > 0) {
            let result = data.map((item) => {
                let labelSelect = this.props.language === LANGUAGES.VI ? item.valueVi : item.valueEn;
                return { value: item.keyMap, label: labelSelect }
            })
            return result
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
        let inforDoctor = {
            contentHtml: state.contentHtml,
            contentMarkdown: state.contentMarkdown,
            description: state.description,
            selectedDoctor: state.selectedDoctor.value
        }

        if (!inforDoctor.selectedDoctor) {
            alert('Please select a doctor');
            return;
        }

        if (this.state.selectedDoctor.value === 0) {
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

        let res = await this.props.postInforDoctor(inforDoctor);

        if (res) {
            await this.setState({
                isUpdating: false,
                contentMarkdown: '',
                description: '',
                selectedDoctor: { value: 0, label: 'Doctor...' },

            })
        }
    }


    updateContentMarkdown = async () => {
        let state = this.state;
        let inforDoctor = {
            contentHtml: state.contentHtml,
            contentMarkdown: state.contentMarkdown,
            description: state.description,
            selectedDoctor: state.selectedDoctor.value
        }

        let res = await putUpdateDetailDoctor(inforDoctor);
        if (res && res.errCode === 0) {
            toast.success(res.message);
            await this.setState({
                isUpdating: false,
                contentMarkdown: '',
                description: '',
                selectedDoctor: { value: 0, label: 'Doctor...' },

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

        this.setState({ selectedDoctor: selectedDoctor })

    };



    handleChangeTextArea = (e) => {
        this.state.description = e.target.value
        this.setState({
            description: e.target.value,
        })

    }



    optionsSelectedDoctor = (list) => {

        list.map((doctor) => {
            this.state.doctors.push({ value: doctor.id, label: `${doctor.lastName} ${doctor.firstName}` });
        })

        return list;
    }


    render() {

        let mdParser = new MarkdownIt(/* Markdown-it options */);


        return (
            <div className="container-markdown container mt-5">

                <h3 className="text-center mb-4"><FormattedMessage id="admin.manage-doctor.title" /></h3>

                <div className="form-row mb-4">


                    <div className="select-doctor col-3 mt-4">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>

                        <Select
                            onChange={this.handleChange}
                            options={this.state.doctors}
                            placeholder="Doctor"
                            value={this.state.selectedDoctor}
                        />
                    </div>




                    <div className="select-price col-3 mt-4">
                        <label htmlFor="">Chọn giá</label>

                        <Select
                            options={this.state.listPrice}
                            placeholder="Price..."
                        />
                    </div>


                    <div className="select-payment col-3 mt-4">
                        <label htmlFor="">Chọn phương thức thanh toán</label>

                        <Select

                            options={this.state.listPayment}
                            placeholder="Payment..."
                        />
                    </div>


                    <div className="select-province col-3 mt-4">
                        <label htmlFor="">Chọn tỉnh thành</label>

                        <Select
                            options={this.state.listProvince}
                            placeholder="Province..."

                        />

                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Tên phòng khám</label>

                        <input className="form-control" type="text" />

                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Địa chỉ phòng khám</label>
                        <input className="form-control" type="text" />

                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Note</label>
                        <input className="form-control" type="text" />


                    </div>





                    <div className="add-intro col-12 mt-4" style={{ display: 'grid' }}>
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.intro-doctor" /></label>
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
                    style={{ height: '500px', }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />

                <div className="col-6 text-center mt-5 mb-5">
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
        language: state.app.language,
        dataAllCode: state.admin.dataAllCode,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
        postInforDoctor: (inforDoctor) => dispatch(actions.postInforDoctor(inforDoctor)),
        fetchDataFromAllCode: () => dispatch(actions.fetchDataFromAllCode()),


    };
};






export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
