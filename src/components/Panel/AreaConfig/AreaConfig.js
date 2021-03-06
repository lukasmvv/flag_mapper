import React, {Component} from 'react';
import classes from './AreaConfig.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/areas';
import * as utils from '../../../utils/utils';

class AreaConfig extends Component {

    // state = {
    //     color: this.props.color,
    //     population: 0,
    //     active: this.props.active,
    //     key: this.props.id
    // }

    changeColor = (event) => {
        this.setState({color: event.target.value});
    }

    changeActive = (event) => {
        event.preventDefault();
        const newActive = !this.state.active;
        this.setState({active: newActive});
    }

    render() {
        const act = this.props.active ? classes.Active : '';
        const cls = [classes.AreaConfig, act].join(' ');
        return (
            <div className={cls} onClick={() => this.props.changeActive(this.props.id)}>
                <input type="color" value={this.props.color} onChange={this.changeColor} className={classes.Color} disabled={true}/>
                <div className={classes.Text}>
                    <p>Population: {utils.numberWithCommas(this.props.population)}</p>
                </div>                
            </div>
        );
    };    
};

// const mapStateToProps = state => {
//     return {
//         areas: state.areas.filter(a => a.)
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        changeActive: (key) => dispatch(actions.changeActive(key)),
    }
}

export default connect(null,mapDispatchToProps)(AreaConfig);