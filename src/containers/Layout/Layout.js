import React, {Component} from 'react';
import classes from './Layout.module.css';
import Map from '../../components/Map/Map';
import Panel from '../../components/Panel/Panel';
import AreaConfig from '../../components/Panel/AreaConfig/AreaConfig';
import * as utils from '../../utils/utils';
import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';
//import axios from 'axios';

class Layout extends Component {
    state = {
        testData: []
    }

    render() {
        return (
            <div className={classes.Layout}>
                <div className={classes.HeaderText}>
                    <p>Total Population: {utils.numberWithCommas(this.props.totalPop)}  ||  Area Goal Population: {utils.numberWithCommas(this.props.totalPop/Math.max(1,this.props.areas.length))}</p>
                    <p>{this.props.localMuni}: {utils.numberWithCommas(this.props.localPop)}</p>
                </div>
                <div className={classes.Content}>
                    <Map data={this.state.testData}/>
                    <Panel>
                        {this.props.areas.map(area => {
                            const propsToUse = {
                                color: area.color,
                                active: area.active,
                                key: area.key,
                                id: area.key,
                                population: area.population
                            }
                            return <AreaConfig {...propsToUse}></AreaConfig>
                        })}
                    </Panel>
                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        areas: state.areas,
        localPop: state.localPop,
        totalPop: state.totalPopulation,
        localMuni: state.localMuni
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         onTryAutoSignUp: () => dispatch(actions.authCheckState())
//     }
// }

export default connect(mapStateToProps, null)(Layout);