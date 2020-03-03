import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import tasksReducer from './tasksReducer'


export default combineReducers({
    users : usersReducer,
    tasks : tasksReducer
})