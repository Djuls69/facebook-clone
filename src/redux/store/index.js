import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'

const persistConfig = {
  key: 'accounts',
  storage,
  whitelist: ['accounts']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
