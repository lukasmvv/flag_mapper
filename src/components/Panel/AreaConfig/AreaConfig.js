import React, {Component} from 'react';
import classes from './AreaConfig.module.css';

class AreaConfig extends Component {

    state = {
        color: this.props.color,
        population: 0,
        active: this.props.active
    }

    changeColor = (event) => {
        this.setState({color: event.target.value});
    }

    changeActive = (event) => {
        event.preventDefault();
        const newActive = !this.state.active;
        this.setState({active: newActive});
    }

    render() {
        const act = this.state.active ? classes.Active : '';
        const cls = [classes.AreaConfig, act].join(' ');
        return (
            <div className={cls}>
                <input type="color" value={this.state.color} onChange={this.changeColor} className={classes.Color}/>
                <div className={classes.Text} onClick={this.changeActive}>
                    <p>Population: {this.state.population}</p>
                </div>                
            </div>
        );
    };    
};

export default AreaConfig;