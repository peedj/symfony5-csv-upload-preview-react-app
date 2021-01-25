import React, {Component} from 'react';
import {Route, Switch, Redirect, Link, withRouter, NavLink, MemoryRouter as Router} from 'react-router-dom';
import CsvList from "./CsvList";
import Upload from "./Upload";
import Welcome from "./Welcome";
import CsvFileData from "./CsvFileData";

class Home extends Component {

    render() {
        return (
            <div>
                <Router>
                    <div className="bg-teal-500">
                        <div className="container mx-auto">
                            <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
                                <div className="flex items-center flex-shrink-0 text-white mr-6">
                                    <NavLink className="font-semibold text-xl tracking-tight" to={"/"}> CSV File
                                        Uploader /
                                        Previewer</NavLink>
                                </div>
                                <div className="block lg:hidden">
                                    <button
                                        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg"><title>Menu</title>
                                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                                    <div className="text-sm lg:flex-grow">
                                        <NavLink to={"/list-csv-files"}
                                                 className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"> List
                                            of Uploaded CSV </NavLink>
                                    </div>
                                    <div>
                                        <NavLink to={"/upload"}
                                                 className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"> Upload
                                            New</NavLink>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <div className="container mx-auto">
                        <Switch>
                            <Redirect exact from="/" to="/welcome"/>
                            <Route path="/welcome" component={Welcome}/>
                            <Route path="/upload" component={Upload}/>
                            <Route path="/list-csv-files" component={CsvList}/>
                            <Route exact path="/view-data-:id" component={CsvFileData}/>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Home;