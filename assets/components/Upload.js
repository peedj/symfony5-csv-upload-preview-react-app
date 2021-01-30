import React, {Component} from 'react'
import axios, {post} from 'axios';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CSV_DELIMITERS} from "../lib/Constants";

class Upload extends Component {

    componentDidMount() {
        window.document.title = 'Upload New File';
    }

    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploading: false,
            fileCorrect: false,
            fileChecking: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }

    onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        this.setState({uploading: true});
        this.fileUpload(this.state.file).then((response) => {
            this.setState({uploading: false, file: null, fileCorrect: false});
            this.fileInput.value = "";
            toast("File Uploaded");
        }).catch((error, description) => {
            toast.error((error.response && error.response.data && error.response.data.detail) || "File Cannot Be Uploaded");
        });
    }

    onChange(e) {
        this.setState({file: e.target.files[0], fileCorrect: false, fileChecking: true});
        this.detectDelimiter(e.target.files[0]);
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

    /**
     *
     * @param file {File}
     */
    detectDelimiter(file) {
        if (!file || file.type !== 'text/csv') {
            this.setState({
                fileChecking: false,
            })
            return;
        }
        const delimiters = Object.assign({}, CSV_DELIMITERS);
        let reader = new FileReader();
        reader.onload = (e) => {
            const text = reader.result;
            const firstLine = text.split('\n').shift();

            let max = 0, maxDelimiter = "";
            for (let [delimiter, d] of Object.entries(delimiters)) {
                delimiters[delimiter] = firstLine.split(delimiter).length - 1;
                if (delimiters[delimiter] > max) {
                    maxDelimiter = delimiter;
                }
            }

            if (maxDelimiter && JSON.stringify(firstLine.split(maxDelimiter)) === JSON.stringify(['date', 'client', 'sign_smartid', 'sign_mobile', 'sign_sc', 'authorize_smartid', 'authorize_mobile', 'authorize_sc', 'ocsp', 'crl'])) {
                this.setState({
                    fileCorrect: true,
                });
            }
            this.setState({
                fileChecking: false,
            })
        }

        reader.readAsText(file, 'UTF-8');
    }

    render() {
        const uploading = this.state.uploading;
        return (
            <div className="form text-center">
                <ToastContainer/>
                <div>
                    <h2 className="m-3 font-medium text-center">Upload Csv File to Server</h2>
                    <div
                        className="border mt-5 rounded bg-gradient-to-br from-teal-500 to-teal-600 p-5 mx-auto inline-block shadow">
                        {uploading ? (
                            <div className="inline-flex flex-center items-center">
                                <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                <span className="ml-2 text-white">Uploading</span>
                            </div>
                        ) : (
                            <form onSubmit={this.onFormSubmit}>
                                <input type="file" onChange={this.onChange} accept="text/csv"
                                       ref={ref => this.fileInput = ref} required/>
                                <button type="submit"
                                        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                                        disabled={!this.state.fileCorrect}>Upload
                                </button>
                                {this.state.file && !this.state.fileCorrect && (
                                    <div className="border text-white mt-2 bg-red-500 p-3 text-center">
                                        {this.state.fileChecking ? (
                                            <div className="inline-flex flex-center items-center">
                                                <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Checking File</span>
                                            </div>
                                        ) : 'Unknown CSV File'}
                                    </div>
                                )}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Upload;