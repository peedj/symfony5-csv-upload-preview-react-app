import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {
    componentDidMount() {
        window.document.title = 'Welcome!';
    }
    render() {
        return (
            <div className={"text-center mt-5"}>
                <h2 className={"text-5xl mb-5 font-bold text-gray-300"}>S/A Stats</h2>
                <div className="max-w-md mx-auto">
                    <div className="text-xl mb-5">Application Features:</div>
                    <ol className="list-decimal text-left">
                        <li className="mb-2">
                            Uploading CSV file of Client Data with daily statistics of how many documents were signed by client and how many authorizations were made by client.
                        </li>
                        <li className="mb-2">
                            Showing Statistics for monthly how many documents were signed by client and how many authorizations were made by client.
                        </li>
                    </ol>

                    <p className="mt-5 text-left">You can start from checking out the <Link to={"/list-csv-files"} className="text-blue-500">list</Link> of uploaded CSV or <Link to={"/upload"} className="text-blue-500">upload</Link> a new Csv File.</p>
                </div>
            </div>
        )
    }
}

export default Welcome;