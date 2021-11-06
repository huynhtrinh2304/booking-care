import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { LANGUAGES, CommonUtils } from '../../../utils';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { postCreateNewSpecialtyService } from '../../../services/specialtyService'
import { toast } from 'react-toastify';

class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            previewImgURL: '',
            isOpenLightBox: false,
            imgSpecialty: '',
            contentHtml: '',
            contentMarkdown: '',
            nameSpecialty: '',
        };



    }

    async componentDidMount() {


    }

    componentDidUpdate(prevProps, prevState) {


    }

    openPreviewImg = () => {

        this.setState({
            isOpenLightBox: true
        })

    }


    handleOnChangeImg = async (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file && file.type.indexOf('image') != -1) {
            let base64 = await CommonUtils.getBase64(file);
            let objecturl = URL.createObjectURL(file);
            await this.setState({
                previewImgURL: objecturl,
                imgSpecialty: base64,
            })
        }
    }

    handleEditorChange = (data) => {
        this.setState({
            contentHtml: data.html,
            contentMarkdown: data.text,
        })
    }

    handleChangeInput = (e, name) => {
        let copyState = { ...this.state }
        copyState[name] = e.target.value;
        this.setState({
            ...copyState
        })
    }

    addInforSpecialty = async () => {
        let { imgSpecialty, contentHtml, contentMarkdown, nameSpecialty } = this.state;
        let res = await postCreateNewSpecialtyService({
            imgSpecialty: imgSpecialty,
            contentHtml: contentHtml,
            contentMarkdown: contentMarkdown,
            nameSpecialty: nameSpecialty
        });
        if (res && res.errCode === 0) {
            this.setState({
                previewImgURL: '',
                imgSpecialty: '',
                contentHtml: '',
                contentMarkdown: '',
                nameSpecialty: '',
            })
            toast.success(res.message);

        } else {
            toast.error(res.message);
        }

    }



    render() {
        let mdParser = new MarkdownIt();



        return (

            <div className="container container-manage-specialty">
                <h3 className="mt-4 text-center">Manage Specialty</h3>

                <div className="row mb-5">
                    <div className="form-group col-6">
                        <label>Tên chuyên khoa</label>
                        <input
                            type="text"
                            value={this.state.nameSpecialty}
                            onChange={(e) => this.handleChangeInput(e, 'nameSpecialty')}
                            className="form-control"

                        />
                    </div>

                    <div className="form-group col-5">
                        <div className="preview-img-container">
                            <input
                                id="preview-img"
                                type="file"
                                hidden
                                onChange={(e) => this.handleOnChangeImg(e)}

                            />
                            <label className="label-upload" htmlFor="preview-img" >Tải ảnh chuyên khoa </label>


                            {this.state.previewImgURL &&
                                <div className="content-img">
                                    <div className="preview-img-content"
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImg()}
                                    >
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>

                <MdEditor
                    style={{ height: '500px', }}
                    renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown}
                />

                {
                    this.state.isOpenLightBox && <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpenLightBox: false })}

                    />
                }

                <div className="col-6 text-center mt-5 mb-5">
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => this.addInforSpecialty()}
                        style={{ width: '120px', borderRadius: '20px' }}
                    >
                        Thêm thông tin
                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
