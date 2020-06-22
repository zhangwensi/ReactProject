import { combineReducers } from 'redux'

import InfosList from './notification.js'
import user from './login.js'

// 联合导出

export default combineReducers({
    InfosList,
    user
})