import React, {Component} from 'react';
import classes from './Layout.module.css';
import Map from '../../components/Map/Map';
import Panel from '../../components/Panel/Panel';
import AreaConfig from '../../components/Panel/AreaConfig/AreaConfig';
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
                    <Map data={this.state.testData}/>
                    <Panel>
                        <AreaConfig color='#007749' active={true}></AreaConfig>
                        <AreaConfig color='#000000' active={false}></AreaConfig>
                        <AreaConfig color='#FFFFFF' active={false}></AreaConfig>
                        <AreaConfig color='#FFB81C' active={false}></AreaConfig>
                        <AreaConfig color='#E03C31' active={false}></AreaConfig>
                        <AreaConfig color='#001489' active={false}></AreaConfig>
                    </Panel>
                </div>
            </div>
        )
    }
};

export default Layout;