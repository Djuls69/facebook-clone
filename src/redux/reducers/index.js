import { combineReducers } from 'redux'
import users from './userReducer'
import accounts from './accountsReducer.js'

const rootReducer = combineReducers({ users, accounts })

export default rootReducer
