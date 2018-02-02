import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './reducers/auth';
import accounts from './reducers/accounts';
import transactions from './reducers/transactions';
import reviewResults from './reducers/reviewResults';


export default createStore(
  combineReducers({ auth, accounts, transactions, reviewResults }),
  applyMiddleware(thunk)
);
