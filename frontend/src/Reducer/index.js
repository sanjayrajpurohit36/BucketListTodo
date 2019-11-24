import { combineReducers } from 'redux';
import user from './userReducer';
import bucket from './bucketReducer';
import todo from './todoReducer';

const appReducer = combineReducers({
    user,
    bucket,
    todo
})

const rootReducer = ( state, action ) => {
    return appReducer(state, action)
}

export default rootReducer;