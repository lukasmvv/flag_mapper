import * as actionTypes from '../actions/actionTypes';
import localMuni from '../../data/localData.json'; 

const initialState = {
    areas: [
        {key: 0, color: '#007749', active: false, population: 0},
        {key: 1, color: '#000000', active: false, population: 0},
        {key: 2, color: '#FFFFFF', active: false, population: 0},
        {key: 3, color: '#FFB81C', active: false, population: 0},
        {key: 4, color: '#E03C31', active: false, population: 0},
        {key: 5, color: '#001489', active: false, population: 0},
    ],
    localPop: 0,
    totalPopulation: 0
    // data: {
    //         type: "FeatureCollection",
    //         features: localMuni.map(m => {
    //         return {
    //             "type": "Feature",
    //             "properties": {
    //                 "CODE": m.Code,
    //                 "NAME": m.Name,
    //                 "DISTRICT": m.District,
    //                 "PROVINCE": m.Province,
    //                 "AREA": m["Area(km2)[2]"],
    //                 "POPULATION": parseInt(m["Population(2016)[3]"].replaceAll(',','')),
    //                 // "POPPER": 100*parseInt(m["Population(2016)[3]"].replaceAll(',',''))/this.totalPopulation
    //             },
    //             "geometry": m.GeoJSON
    //             };
    //         })
    //     },
    // totalPopulation: localMuni.map(m => parseInt(m["Population(2016)[3]"].replaceAll(',',''))).reduce((a, b) => a + b, 0)
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_ACTIVE:
            const updatedState = {
                ...state,
                areas: state.areas.map(area => {
                    if (area.key!==action.key) {
                        return {...area, active: false};
                    } else {
                        return {...area, active: !area.active}
                    }
                })
            }
            return updatedState;
        case actionTypes.UPDATE_POPULATIONS:
            const areas = state.areas.map(area => {
                if (action.oldColor===action.newColor) {
                    area.population = area.population;
                } else if (area.color===action.oldColor) {
                    area.population = area.population - action.population;
                } else if (area.color===action.newColor) {
                    area.population = area.population + action.population;
                }
                return area;
            });
            const updatedPopulationState = {...state, areas: areas}
            return {...updatedPopulationState}
        case actionTypes.UPDATE_LOCAL_POP:
            return {
                ...state,
                localPop: action.localPop
            }
        case actionTypes.ADD_TO_LOCAL_POP:
            const pop = state.totalPopulation;
            return {
                ...state,
                totalPopulation: pop + action.pop
            }
        default: return {...state};
    }
};

export default reducer;