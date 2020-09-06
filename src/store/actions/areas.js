import * as actionTypes from './actionTypes';

export const changeActive = (key) => {
    return {
        type: actionTypes.CHANGE_ACTIVE,
        key: key
    }
}

export const updatePopulations = (oldColor, newColor, population) => {
    return {
        type: actionTypes.UPDATE_POPULATIONS,
        oldColor: oldColor,
        newColor: newColor,
        population: population
    }
}

export const updateLocalPop = (localPop) => {
    return { 
        type: actionTypes.UPDATE_LOCAL_POP,
        localPop: localPop
    }
}

export const addToTotalPop = (pop) => {
    return {
        type: actionTypes.ADD_TO_LOCAL_POP,
        pop: pop
    }
}