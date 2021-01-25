import React, {Component} from 'react';
import {Link, MemoryRouter as Router} from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import moment from 'moment';

class CsvList extends Component {
    constructor() {
        super();
        this.perPage = 10;
        this.state = {items: [], loading: true, atall: 0};
    }

    componentDidMount() {
        this.getItems();
    }

    getItems(pageNum = 1) {
        axios.get(`http://127.0.0.1:8001/api/csv/${pageNum}/${this.perPage}`).then(response => {
            this.setState({items: response.data.items, loading: false, atall: response.data.atall})
        })
    }

    getPageCount() {
        return this.state.atall ? Math.ceil(this.state.atall / this.perPage) : 0;
    }

    formatTimestampAsDate(timestamp) {
        return moment(timestamp * 1000).format("lll");
    }

    render() {
        const handlePageClick = ({selected: selectedPage}) => {
            this.getItems(selectedPage + 1);
        };

        const loading = this.state.loading;
        return (
            <div>
                <Router>
                    <section className="row-section">
                        <h2 className="m-3 font-medium text-center">Csv File List</h2>
                        {loading ? (
                            <div className={'row text-center'}>
                                <span className="fa fa-spin fa-spinner fa-4x"></span>
                            </div>
                        ) : (
                            <div className={'row'}>
                                <table
                                    className="table table-auto border-collapse border-t border-b w-full text-center">
                                    <thead>
                                    <tr className={"border-t border-b"}>
                                        <th className={"p-2"}>File Name</th>
                                        <th className={"p-2"}>Date Created</th>
                                        <th className={"p-2"}>Status</th>
                                        <th className={"p-2"}>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.items.map(
                                        item =>
                                            <tr id={item.id} key={item.id} className={"border-t border-b"}>
                                                <td className={"p-2 filename"}>{item.fileName}</td>
                                                <td className={"p-2"}>{this.formatTimestampAsDate(item.dateCreated)}</td>
                                                <td className={"p-2"}>{item.status}</td>
                                                <td className={"p-4"}>
                                                    <Link
                                                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                                        to={`/view-data-${item.id}`}> View Data</Link>
                                                </td>
                                            </tr>
                                    )}
                                    </tbody>
                                    <tfoot>
                                    <tr>
                                        <td colSpan="5" className={"p-4 text-center"}>
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
                                        </td>
                                    </tr>
                                    </tfoot>
                                </table>
                            </div>
                        )}
                    </section>
                </Router>
            </div>
        )
    }
}

export default CsvList;