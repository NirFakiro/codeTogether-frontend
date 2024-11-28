import { legacy_createStore as createStore, combineReducers } from 'redux'
import { codeReducer } from './reducers/code.reducer'

const rootReducer = combineReducers({
  codeModule: codeReducer,
})

const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
  : undefined
export const store = createStore(rootReducer, middleware)
