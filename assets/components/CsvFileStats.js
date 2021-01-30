import React, {Component} from 'react';
import axios from 'axios';

import DataGrid, {
    Column,
    Pager,
    Paging,
    Sorting,
    GroupPanel,
    FilterRow,
    Selection,
    SearchPanel,
    FilterPanel
} from 'devextreme-react/data-grid';
import CustomStore from "devextreme/data/custom_store";
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';

class CsvListData extends Component {
    componentDidMount() {
        window.document.title = 'Customers Month Stats';
    }

    constructor(props) {
        super(props);
        this.prevCall = {};
        this.state = {statFileName: "Loading..."};
        this.gridDataSource = {
            store: new CustomStore({
                key: "id",
                load: (loadOptions) => {
                    const callJson = JSON.stringify(loadOptions);
                    if(this.prevCall[callJson]) {
                        return new Promise((resolve) => {
                            resolve(this.prevCall[callJson]);
                        })
                    }

                    return axios.get(`http://127.0.0.1:8001/api/csv-stats/${this.props.match.params.id}`, {
                        params: {
                            loadOptions
                        }
                    }).then(response => {
                        if (this.state.statFileName === "Loading...") {
                            this.setState({statFileName: response.data.fileName});
                        }
                        this.prevCall[callJson] = {};
                        this.prevCall[callJson] = {
                            data: response.data.items,
                            totalCount: response.data.totalCount,
                        };

                        return this.prevCall[callJson];
                    })
                }
            })
        }
    }

    render() {
        return (
            <div>
                <section className="row-section">
                    <h2 className="m-3 font-medium text-center">Data for file: {this.state.statFileName}</h2>
                    <div>
                        <DataGrid
                            dataSource={this.gridDataSource}
                            showBorders={true}
                            remoteOperations={{paging: true, filtering: true, sorting: true}}
                        >
                            <SearchPanel visible={true}
                                         width={240}
                                         placeholder="Search..."/>
                            <Selection mode="single"/>
                            <FilterRow visible={true}/>
                            <Sorting mode="multiple"/>
                            <Paging defaultPageSize={10}/>
                            <Pager
                                showPageSizeSelector={true}
                                allowedPageSizes={[5, 10, 20]}
                                showInfo={true}/>
                            <GroupPanel visible={true}/>
                            <FilterPanel filterEnabled={true} visible={true}/>
                            <Column dataField="client" defaultSortOrder="asc" groupIndex={0} />
                            <Column dataField="group_month" defaultSortOrder="asc"  groupIndex={1} />
                            <Column dataField="authorizations" allowSearch={false} allowFiltering={false}/>
                            <Column dataField="signs" allowSearch={false} allowFiltering={false}/>
                        </DataGrid>
                    </div>
                </section>
            </div>
        )
    }
}

export default CsvListData;