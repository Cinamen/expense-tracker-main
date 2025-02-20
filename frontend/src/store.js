import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import expenseReducer from './reducers/expenseReducer';
import userReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  auth: userReducer,
  expenses: expenseReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
