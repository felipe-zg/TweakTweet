import {combineReducers} from 'redux';

import User from './User/reducer';
import Posts from './Posts/reducer';

const rootReducer = combineReducers({
  User,
  Posts,
});

export default rootReducer;
