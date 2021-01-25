import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

class CsvListData extends Component {
    constructor(props) {
        super(props);
        this.perPage = 10;
        this.currentPage = 1;
        this.state = {items: [], loading: true, atall: 0, fileName: ""};
    }

    componentDidMount() {
        this.getItems();
    }

    getItems(pageNum = 1) {
        this.currentPage = pageNum;
        axios.get(`http://127.0.0.1:8001/api/csv-data/${this.props.match.params.id}/${pageNum}/${this.perPage}`).then(response => {
            this.setState({
                items: response.data.items,
                loading: false,
                atall: response.data.atall,
                fileName: response.data.fileName
            })
        })
    }

    getPageCount() {
        return this.state.atall ? Math.ceil(this.state.atall / this.perPage) : 0;
    }

    formatTimestampAsDate(timestamp) {
        return moment(timestamp).format("lll");
    }

    render() {
        const handlePageClick = ({selected: selectedPage}) => {
            this.getItems(selectedPage + 1);
        };

        const loading = this.state.loading;
        const items = this.state.items;
        const itemsLength = items.length;
        return (
            <div>
                <section className="row-section">
                    <h2 className="m-3 font-medium text-center">Data for file: {this.state.fileName}</h2>
                    {loading ? (
                        <div className={'row text-center'}>
                            <span className="fa fa-spin fa-spinner fa-4x"></span>
                        </div>
                    ) : (
                        <div>
                            {itemsLength === 0 ? (
                                <div className={'row text-center'}>
                                    No Data
                                </div>
                            ) : (
                                <div>
                                    <div className={'overflow-x-auto'}>
                                        <table
                                            className="table table-auto border-collapse border-t border-b w-full text-center whitespace-nowrap">
                                            <thead>
                                            <tr className={"border-t border-b"}>
                                                <th className={"p-2"} colSpan={this.state.items[0].length}></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.items.map(
                                                (row, index) =>
                                                    <tr className={"border-t border-b"}
                                                        key={`${this.currentPage}-${index}`}>
                                                        {row.map(
                                                            (item, columnNum) =>
                                                                <td key={`${this.currentPage}-${index}-${columnNum}`}>{item}</td>
                                                        )}
                                                    </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className={"p-4 text-center"}>
                                        <div className={"inline-block mx-auto w-auto"}>
                                            <ReactPaginate pageCount={this.getPageCount()}
                                                           onPageChange={handlePageClick}
                                                           containerClassName="flex flex-row content-center"
                                                           pageClassName="p-2"
                                                           pageLinkClassName="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border  hover:border-blue-500 rounded"
                                                           activeLinkClassName="border-blue-700"
                                                           disabledClassName="text-gray-300"
                                                           nextClassName="p-2"
                                                           previousClassName="p-2"
                                                           previousLinkClassName="bg-grey-500 text-gray font-bold py-2 px-4 border border-grey-700 rounded"
                                                           nextLinkClassName="bg-grey-500 text-gray font-bold py-2 px-4 border border-grey-700 rounded"
                                            ></ReactPaginate>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        )
    }
}

export default CsvListData;