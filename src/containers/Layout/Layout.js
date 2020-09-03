import React, {Component} from 'react';
import classes from './Layout.module.css';
import Map from '../../components/Map/Map';
import Panel from '../../components/Panel/Panel';
//import axios from 'axios';

class Layout extends Component {
    state = {
        testData: []
    }
    render() {
        return (
            <div className={classes.Layout}>
                <p>this is a test</p>
                <div className={classes.Content}>
                    <Panel/>
                    <Map data={this.state.testData}/>
                    <Panel/>
                </div>
            </div>
        )
    }
};

export default Layout;