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
import { getInforDoctorService, putUpdateDetailDoctor } from '../../../services/doctorService';

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


            listPriceVi: [],
            listPaymentVi: [],
            listProvinceVi: [],

            listPriceEn: [],
            listPaymentEn: [],
            listProvinceEn: [],

            listSpecialty: [],
            listClinic: [],

            // Save to doctor_infor table
            selectedPriceVi: '',
            selectedPaymentVi: '',
            selectedProvinceVi: '',

            selectedPriceEn: '',
            selectedPaymentEn: '',
            selectedProvinceEn: '',

            selectedSpecialty: '',
            selectedClinic: '',

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
            let price = this.buildDataSelect(this.props.dataAllCode.price, true);
            let payment = this.buildDataSelect(this.props.dataAllCode.payment);
            let province = this.buildDataSelect(this.props.dataAllCode.province);
            let specialty = this.buildDataSelectMore(this.props.dataAllCode.specialty);
            let clinic = this.buildDataSelectMore(this.props.dataAllCode.clinic);


            this.setState({
                listPriceVi: price.dataVi,
                listPaymentVi: payment.dataVi,
                listProvinceVi: province.dataVi,

                listPriceEn: price.dataEn,
                listPaymentEn: payment.dataEn,
                listProvinceEn: province.dataEn,
                listSpecialty: specialty,
                listClinic: clinic,

            })
        }

        if (prevProps.language !== this.props.language) {
            let price = this.buildDataSelect(this.props.dataAllCode.price, true);
            let payment = this.buildDataSelect(this.props.dataAllCode.payment);
            let province = this.buildDataSelect(this.props.dataAllCode.province);



            this.setState({

                listPriceVi: price.dataVi,
                listPaymentVi: payment.dataVi,
                listProvinceVi: province.dataVi,

                listPriceEn: price.dataEn,
                listPaymentEn: payment.dataEn,
                listProvinceEn: province.dataEn,
            })

        }



    }


    buildDataSelect = (data, price) => {
        let result = { dataVi: [], dataEn: [] };
        if (data && data.length > 0) {
            data.map((item) => {
                if (price === true) {
                    result.dataVi.push({ value: item.keyMap, label: item.valueVi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ' })
                    result.dataEn.push({ value: item.keyMap, label: item.valueEn + ' USD' })
                } else {
                    result.dataVi.push({ value: item.keyMap, label: item.valueVi })
                    result.dataEn.push({ value: item.keyMap, label: item.valueEn })
                }

            })
        }
        return result
    }

    buildDataSelectMore = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item) => {
                result.push({ value: item.id, label: item.name })
            })
        }
        return result;
    }

    optionsSelectedDoctor = (list) => {

        list.map((doctor) => {
            this.state.doctors.push({ value: doctor.id, label: `${doctor.lastName} ${doctor.firstName}` });
        })

        return list;
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
            selectedDoctor: state.selectedDoctor.value,

            // data table doctor_infor
            price: state.selectedPriceVi.value,
            payment: state.selectedPaymentVi.value,
            province: state.selectedProvinceVi.value,
            specialty: state.selectedSpecialty.value,
            clinic: state.selectedclinic.value,
            addressClinic: state.addressClinic,
            nameClinic: state.nameClinic,
            note: state.note,




        }



        if (!inforDoctor.selectedDoctor) {
            alert('Please select a doctor');
            return;
        }

        let response = this.validateInput(inforDoctor)

        if (response) {

            let res = await this.props.postInforDoctor(inforDoctor);

            if (res) {
                await this.setState({
                    isUpdating: false,
                    contentMarkdown: '',
                    description: '',
                    selectedDoctor: '',

                    nameClinic: '',
                    addressClinic: '',
                    note: '',

                    selectedPriceVi: '',
                    selectedPriceEn: '',

                    selectedPaymentVi: '',
                    selectedPaymentEn: '',

                    selectedProvinceVi: '',
                    selectedProvinceEn: '',

                    selectedSpecialty: '',
                    selectedClinic: '',


                })
            }
        }
    }

    validateInput = (inforDoctor) => {
        let arrValidate = [
            'price',
            'payment',
            'specialty',
            'province',
            'nameClinic',
            'addressClinic',
            'note',
            'description',
            'contentMarkdown',
        ];

        for (let i = 0; i < arrValidate.length; i++) {

            if (!inforDoctor[arrValidate[i]]) {
                alert(`You missing ${arrValidate[i]} for doctor `);
                return false;
            }
        }
        return true;
    }



    updateContentMarkdown = async () => {
        let state = this.state;
        let inforDoctor = {
            contentHtml: state.contentHtml,
            contentMarkdown: state.contentMarkdown,
            description: state.description,
            selectedDoctor: state.selectedDoctor.value,

            // data table doctor_infor
            price: this.state.selectedPriceVi.value,
            payment: this.state.selectedPaymentVi.value,
            province: this.state.selectedProvinceVi.value,
            specialty: this.state.selectedSpecialty.value,
            clinic: this.state.selectedClinic.value,
            addressClinic: this.state.addressClinic,
            nameClinic: this.state.nameClinic,
            note: this.state.note,

        }


        let res = await putUpdateDetailDoctor(inforDoctor);
        if (res && res.errCode === 0) {
            toast.success(res.message);
            await this.setState({
                isUpdating: false,
                contentMarkdown: '',
                description: '',
                selectedDoctor: '',

                selectedPriceVi: '',
                selectedPriceEn: '',

                selectedPaymentVi: '',
                selectedPaymentEn: '',

                selectedProvinceVi: '',
                selectedProvinceEn: '',

                selectedSpecialty: '',
                selectedClinic: '',

                nameClinic: '',
                addressClinic: '',
                note: '',
            })

        }
    }



    handleChange = async (selectedDoctor) => {

        let res = await getInforDoctorService(selectedDoctor.value);
        console.log(res);

        if (res && res.error === 0 && res.inforDoctor !== 0) {
            if (res.inforDoctor && res.inforDoctor.dataMarkdown && res.inforDoctor.doctorInfor) {

                this.setState({
                    isUpdating: true,
                    contentMarkdown: res.inforDoctor.dataMarkdown.contentMarkdown,
                    contentHtml: res.inforDoctor.dataMarkdown.contentHtml,
                    description: res.inforDoctor.dataMarkdown.description,


                    selectedPriceVi: {
                        value: res.inforDoctor.doctorInfor.priceId,
                        label: res.inforDoctor.doctorInfor.priceData.valueVi.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' đ'
                    },

                    selectedPriceEn: {
                        value: res.inforDoctor.doctorInfor.priceId,
                        label: res.inforDoctor.doctorInfor.priceData.valueEn + " USD"
                    },


                    selectedPaymentVi: {
                        value: res.inforDoctor.doctorInfor.paymentId,
                        label: res.inforDoctor.doctorInfor.paymentData.valueVi
                    },

                    selectedPaymentEn: {
                        value: res.inforDoctor.doctorInfor.paymentId,
                        label: res.inforDoctor.doctorInfor.paymentData.valueEn
                    },


                    selectedProvinceVi: {
                        value: res.inforDoctor.doctorInfor.provinceId,
                        label: res.inforDoctor.doctorInfor.provinceData.valueVi
                    },

                    selectedProvinceEn: {
                        value: res.inforDoctor.doctorInfor.provinceId,
                        label: res.inforDoctor.doctorInfor.provinceData.valueEn
                    },

                    selectedSpecialty: {
                        value: res.inforDoctor.doctorInfor.specialty.id,
                        label: res.inforDoctor.doctorInfor.specialty.name
                    },

                    selectedClinic: {
                        value: res.inforDoctor.doctorInfor.clinic.id,
                        label: res.inforDoctor.doctorInfor.clinic.name
                    },

                    nameClinic: res.inforDoctor.doctorInfor.nameClinic,
                    addressClinic: res.inforDoctor.doctorInfor.addressClinic,
                    note: res.inforDoctor.doctorInfor.note,


                })
            }
        }



        if (res.inforDoctor === 0) {
            this.setState({
                isUpdating: false,
                contentMarkdown: '',
                contentHtml: '',
                description: '',

                nameClinic: '',
                addressClinic: '',
                note: '',

                selectedPriceVi: '',
                selectedPriceEn: '',

                selectedPaymentVi: '',
                selectedPaymentEn: '',

                selectedProvinceVi: '',
                selectedProvinceEn: '',

                selectedSpecialty: '',
                selectedClinic: ''


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

    handleChangeSelectData = (nameVi, nameEn, listPriceVi, listPriceEn, value) => {
        let valueVi = {};
        let valueEn = {};

        listPriceVi.map(item => {
            if (item.value === value.value) {
                valueVi = { value: value.value, label: item.label }
            }
        });

        listPriceEn.map(item => {
            if (item.value === value.value) {
                valueEn = { value: value.value, label: item.label }
            }
        });

        this.setState({
            [nameVi]: valueVi,
            [nameEn]: valueEn,

        })
    }

    handleChangeSelectDataMore = (value, name) => {
        this.setState({
            [name]: value,
        })
    }

    onChangeInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;


        this.setState({
            [name]: value
        })
    }




    render() {

        let mdParser = new MarkdownIt(/* Markdown-it options */);

        let { language } = this.props;
        let {
            listPriceVi, listPaymentVi, listProvinceVi, listPriceEn, listPaymentEn, listProvinceEn,
            listSpecialty,
            listClinic
        } = this.state;

        let {
            selectedPriceVi, selectedPaymentVi, selectedProvinceVi,
            selectedPriceEn, selectedPaymentEn, selectedProvinceEn,
            selectedSpecialty, selectedClinic
        } = this.state;


        return (
            <div className="container-markdown container mt-5">

                <h3 className="text-center mb-4"><FormattedMessage id="admin.manage-doctor.title" /></h3>

                <div className="form-row mb-4">


                    <div className="select-doctor col-4 mt-4">
                        <label htmlFor=""><FormattedMessage id="admin.manage-doctor.select-doctor" /></label>

                        <Select
                            onChange={this.handleChange}
                            options={this.state.doctors}
                            placeholder="Doctor"
                            value={this.state.selectedDoctor}
                        />
                    </div>




                    <div className="select-price col-4 mt-4">
                        <label htmlFor="">Chọn giá</label>

                        <Select
                            options={language === LANGUAGES.VI ? listPriceVi : listPriceEn}
                            placeholder="Price..."
                            onChange={this.handleChangeSelectData.bind(
                                this, 'selectedPriceVi', 'selectedPriceEn', listPriceVi, listPriceEn
                            )}
                            value={language === LANGUAGES.VI ? selectedPriceVi : selectedPriceEn}
                        />
                    </div>


                    <div className="select-payment col-4 mt-4">
                        <label htmlFor="">Chọn phương thức thanh toán</label>

                        <Select
                            options={language === LANGUAGES.VI ? listPaymentVi : listPaymentEn}
                            placeholder="Payment..."
                            onChange={this.handleChangeSelectData.bind(
                                this, 'selectedPaymentVi', 'selectedPaymentEn', listPaymentVi, listPaymentEn
                            )}
                            value={language === LANGUAGES.VI ? selectedPaymentVi : selectedPaymentEn}
                        />
                    </div>


                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Chọn chuyên khoa</label>

                        <Select
                            options={listSpecialty}
                            placeholder="Specialty..."
                            onChange={(e) => this.handleChangeSelectDataMore(e, 'selectedSpecialty')}
                            value={selectedSpecialty}
                        />

                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Chọn phòng khám</label>

                        <Select
                            options={listClinic}
                            placeholder="Clinic..."
                            onChange={(e) => this.handleChangeSelectDataMore(e, 'selectedClinic')}
                            value={selectedClinic}
                        />


                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Chọn tỉnh thành</label>

                        <Select
                            options={language === LANGUAGES.VI ? listProvinceVi : listProvinceEn}
                            placeholder="Province..."
                            onChange={this.handleChangeSelectData.bind(
                                this, 'selectedProvinceVi', 'selectedProvinceEn', listProvinceVi, listProvinceEn
                            )}
                            value={language === LANGUAGES.VI ? selectedProvinceVi : selectedProvinceEn}
                        />

                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Tên phòng khám</label>
                        <input
                            className="form-control"
                            name="nameClinic"
                            type="text"
                            value={this.state.nameClinic}
                            onChange={(e) => this.onChangeInput(e)}

                        />

                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Địa chỉ phòng khám</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.addressClinic}
                            name="addressClinic"
                            onChange={(e) => this.onChangeInput(e)}
                        />

                    </div>

                    <div className="select-province col-4 mt-4">
                        <label htmlFor="">Note</label>
                        <input
                            className="form-control"
                            name="note"
                            type="text"
                            value={this.state.note}
                            onChange={(e) => this.onChangeInput(e)}

                        />


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
