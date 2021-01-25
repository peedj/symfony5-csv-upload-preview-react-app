import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter} from 'react-router-dom';
import CsvList from "./CsvList";
import Upload from "./Upload";

class Welcome extends Component {

    render() {
        return (
            <div className={"text-center mt-5"}>
                <h2 className={"text-5xl mb-5 font-bold text-gray-300"}>CSV Upload / Preview Application</h2>
            </div>
        )
    }
}

export default Welcome;