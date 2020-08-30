import { combineReducers } from 'redux';
import { accountReducer } from './account';

//compile all reducers together
export default combineReducers({
	account: accountReducer,
});
