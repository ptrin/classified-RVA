import { combineReducers } from 'redux';
import AdReducer from './ads';

const rootReducer = combineReducers({
    ads: AdReducer
});

export default rootReducer;
