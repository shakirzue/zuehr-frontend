import { combineReducers } from 'redux';
import { users } from './user';
import { attendance } from './attendance';
import { hrModule, familyInfo } from './hr';
import { alert } from './alert';

export default combineReducers({
    alert,
    users,
    attendance,
    hrModule,
    familyInfo
});