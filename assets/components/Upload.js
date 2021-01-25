import React, {Component} from 'react'
import axios, {post} from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploading: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response) => {
            this.state.uploading = false;
            this.fileInput.value = "";
            toast("File Uploaded");
        }).catch((error, description) => {
            toast.error((error.response && error.response.data && error.response.data.detail) || "File Cannot Be Uploaded");
        });
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    fileUpload(file) {
        const url = 'http://127.0.0.1:8001/api/csv';
        const formData = new FormData();
        formData.append('csv_file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        const uploading = this.state.uploading;
        return (
            <div className="form text-center">
                <ToastContainer />
                {uploading ? (
                    <div className={'row text-center'}>
                        <span className="fa fa-spin fa-spinner fa-4x"></span>
                    </div>
                ) : (
                    <div>
                        <h2 className="m-3 font-medium text-center">Upload Csv File to Server</h2>
                        <div
                            className="border mt-5 rounded bg-gradient-to-br from-teal-500 to-teal-600 p-5 mx-auto inline-block shadow">
                            <form onSubmit={this.onFormSubmit}>
                                <input type="file" onChange={this.onChange} accept="text/csv" ref={ref=> this.fileInput = ref} required/>
                                <button type="submit"
                                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Upload
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Upload;