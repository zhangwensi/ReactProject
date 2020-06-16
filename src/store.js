import { createStore,applyMiddleware } from 'redux'

import thunk from 'redux-thunk'


// 引入根文件

import rootReducer from './reducer/index.js'

export default createStore(rootReducer,applyMiddleware(thunk))