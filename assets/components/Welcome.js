import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {

    render() {
        return (
            <div className={"text-center mt-5"}>
                <h2 className={"text-5xl mb-5 font-bold text-gray-300"}>CSV Upload / Preview Application</h2>
                <Link to={"/list-csv-files"}
                      className="inline-block text-sm px-4 py-2 leading-none border rounded text-teal-800 border-teal hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"> List
                    of Uploaded CSV </Link>
            </div>
        )
    }
}

export default Welcome;