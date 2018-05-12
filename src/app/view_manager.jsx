import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'

import CreateWatcher from './components/create_watcher';

import '../assets/css/semantic/semantic.min.css';
import '../assets/css/app.css';

class ViewManager extends React.Component {
    static Views() {
        return {
            CreateWatcher: <CreateWatcher />
        }
    }

    static View(props) {
        let name = props.location.search.substr(1);
        let view = ViewManager.Views()[name];

        if (view == null) {
            throw new Error("View '" + name + "' is undefined");
        }

        return view;
    }

    render() {
        return ( 
            <Router>
                <div >
                    <Route path = '/' component = { ViewManager.View } /> 
                </div> 
            </Router>
        );
    }
}

export default ViewManager;