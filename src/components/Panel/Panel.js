import React from 'react';
import classes from './Panel.module.css';

const panel = (props) => {
    return (
        <div className={classes.Panel}>
            {props.children}
        </div>  
    );
};

export default panel;