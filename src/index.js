import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import {createStore,applyMiddleware,compose} from 'redux';
import reducer from './store/reducers/areas';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// const rootReducer = combineReducers({
//     reducer: reducer,
// });

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

//const store = createStore(reducer);
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
